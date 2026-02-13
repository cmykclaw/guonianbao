import { Router } from 'express'
import giftRoutes from './gift.routes'
import relativesRoutes from './relatives.routes'
import tipsRoutes from './tips.routes'
import authRoutes from './auth.routes'

const router = Router()

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' })
})

// Auth routes - mounted at /api/auth
router.use('/auth', authRoutes)

// Gift records routes - mounted at /api/gifts
router.use('/gifts', giftRoutes)

// Relatives routes - mounted at /api/relatives
router.use('/relatives', relativesRoutes)

// Tips routes - mounted at /api/tips
router.use('/tips', tipsRoutes)

export default router