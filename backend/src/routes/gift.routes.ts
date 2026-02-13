import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// GET /api/gifts - 获取当前用户的礼薄记录
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId
    
    const records = await prisma.giftRecord.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' }
    })
    
    res.json({ code: 200, data: records })
  } catch (error) {
    console.error('Get gifts error:', error)
    res.status(500).json({ code: 500, message: '获取记录失败' })
  }
})

// POST /api/gifts - 创建新的礼薄记录
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, type, amount, notes, date } = req.body
    const userId = req.user?.userId

    if (!name || !type || !amount) {
      return res.status(400).json({ code: 400, message: '姓名、类型和金额不能为空' })
    }

    const record = await prisma.giftRecord.create({
      data: {
        name,
        type,
        amount: parseFloat(amount),
        notes,
        date: date ? new Date(date) : new Date(),
        userId
      }
    })

    res.json({ code: 200, data: record })
  } catch (error) {
    console.error('Create gift error:', error)
    res.status(500).json({ code: 500, message: '创建记录失败' })
  }
})

export default router
