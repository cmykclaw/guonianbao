import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './middleware/error.middleware'

export const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'guonianbao-api'
  })
})

// Error handling
app.use(errorHandler)