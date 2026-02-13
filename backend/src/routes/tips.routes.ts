import { Router } from 'express'
import OpenAI from 'openai'

const router = Router()

const client = new OpenAI({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/'
})

const GREETING_SYSTEM_PROMPT = '你是一个高情商的中国拜年文案大师。请根据用户提供的对象特征，生成 3 条风格不同的拜年吉祥话（比如：真诚版、文采版、幽默版）。必须直接输出一个 JSON 格式的字符串数组，例如 ["祝福1", "祝福2", "祝福3"]，不要输出任何其他解释文本和 Markdown 标记。'

const COMEBACK_SYSTEM_PROMPT = '你是一个精通人情世故、懂幽默的沟通大师。用户在过年走亲戚时被问了一个尴尬问题。请给出 3 条高情商回复（比如：乖巧端水版、幽默转移话题版、温和反击版）。必须直接输出一个 JSON 格式的字符串数组，例如 ["回复1", "回复2", "回复3"]，不要输出任何其他解释文本和 Markdown 标记。'

router.post('/generate', async (req, res) => {
  try {
    const { type, context } = req.body

    if (!type || (type !== 'greeting' && type !== 'comeback')) {
      return res.status(400).json({ error: 'type must be greeting or comeback' })
    }

    if (!context) {
      return res.status(400).json({ error: 'context is required' })
    }

    const systemPrompt = type === 'greeting' ? GREETING_SYSTEM_PROMPT : COMEBACK_SYSTEM_PROMPT

    const completion = await client.chat.completions.create({
      model: 'glm-4-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: context }
      ]
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      return res.status(500).json({ error: 'AI generation failed' })
    }

    let results: string[]
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) {
        results = parsed.map(item => {
          if (typeof item === 'string') return item
          if (typeof item === 'object' && item !== null) {
            return Object.entries(item).map(([key, val]) => `${key}: ${val}`).join(' ')
          }
          return String(item)
        })
      } else {
        results = [content]
      }
    } catch {
      results = [content]
    }

    res.json({ results })
  } catch (error) {
    console.error('Tips generation error:', error)
    res.status(500).json({ error: 'AI generation failed' })
  }
})

export default router
