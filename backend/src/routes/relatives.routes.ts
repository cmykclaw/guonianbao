import { Router } from 'express'
import OpenAI from 'openai'

const router = Router()

const client = new OpenAI({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/'
})

const SYSTEM_MESSAGE = '你是一个中国亲属关系称呼专家。用户会给你一段复杂的关系描述，请你直接回答正确的称呼。如果关系太复杂没有特定称呼，请给出最合适的泛称（如表亲、远房亲戚等）。注意：只输出称呼本身，绝对不要输出任何标点符号、解释或废话。'

router.post('/calculate', async (req, res) => {
  try {
    const { relation } = req.body

    if (!relation) {
      return res.status(400).json({ error: 'relation is required' })
    }

    if (typeof relation !== 'string' || relation.trim() === '') {
      return res.status(400).json({ error: 'relation cannot be empty' })
    }

    const completion = await client.chat.completions.create({
      model: 'glm-4-flash',
      messages: [
        { role: 'system', content: SYSTEM_MESSAGE },
        { role: 'user', content: relation }
      ]
    })

    const title = completion.choices[0]?.message?.content

    if (!title) {
      return res.status(500).json({ error: 'AI calculation failed' })
    }

    res.json({ title: title.trim() })
  } catch (error) {
    console.error('AI calculation error:', error)
    res.status(500).json({ error: 'AI calculation failed' })
  }
})

export default router
