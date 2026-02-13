import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './middleware/error.middleware'

export const app = express()

// Middleware
app.use(cors({
  /**
   * 为了兼容本地开发和 Vercel 部署，这里：
   * - development：放行 Vite 本地地址
   * - production：放行任意前端域名（也可以改成精确白名单）
   */
  origin: process.env.NODE_ENV === 'production'
    ? true // 生产环境：自动反射请求来源
    : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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