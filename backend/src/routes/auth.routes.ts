import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
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

    const user = await prisma.user.findUnique({
      where: { deviceId }
    })

    res.json({ isRegistered: !!user })
  } catch (error) {
    console.error('Check device error:', error)
    res.status(500).json({ error: '检查设备失败' })
  }
})

router.post('/register-pin', async (req, res) => {
  try {
    const { deviceId, pin } = req.body

    if (!deviceId || !pin) {
      return res.status(400).json({ error: 'deviceId and pin are required' })
    }

    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({ error: 'PIN must be 4 digits' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { deviceId }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Device already registered' })
    }

    const hashedPin = await bcrypt.hash(pin, 10)

    const user = await prisma.user.create({
      data: {
        deviceId,
        pin: hashedPin
      }
    })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    res.json({ token, userId: user.id })
  } catch (error) {
    console.error('Register PIN error:', error)
    res.status(500).json({ error: '注册失败' })
  }
})

router.post('/verify-pin', async (req, res) => {
  try {
    const { deviceId, pin } = req.body

    if (!deviceId || !pin) {
      return res.status(400).json({ error: 'deviceId and pin are required' })
    }

    const user = await prisma.user.findUnique({
      where: { deviceId }
    })

    if (!user) {
      return res.status(401).json({ error: 'Device not registered' })
    }

    const isValid = await bcrypt.compare(pin, user.pin)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid PIN' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    res.json({ token, userId: user.id })
  } catch (error) {
    console.error('Verify PIN error:', error)
    res.status(500).json({ error: '验证失败' })
  }
})

export default router
