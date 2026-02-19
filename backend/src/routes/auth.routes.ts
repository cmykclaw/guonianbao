import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const router = Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'guonianbao-secret-key'
const JWT_EXPIRES_IN = '7d'

router.post('/check-device', async (req, res) => {
  try {
    const { deviceId } = req.body

    if (!deviceId) {
      return res.status(400).json({ error: 'deviceId is required' })
    }

    let user = await prisma.user.findUnique({
      where: { deviceId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: { deviceId }
      })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    res.json({ token, deviceId: user.deviceId })
  } catch (error) {
    console.error('Check device error:', error)
    res.status(500).json({ error: '检查设备失败' })
  }
})

export default router
