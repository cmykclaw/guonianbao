import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './middleware/error.middleware'

export const app = express()

// 1. 定义白名单
const whitelist = [
  'https://guonianbao.fun',
  'https://www.guonianbao.fun', // 必须加上带 www 的版本
  'http://localhost:5173'
]

// 2. 配置 CORS
app.use(cors({
  origin: (origin, callback) => {
    // 允许没有 origin 的请求 (比如移动端应用或 curl)
    if (!origin) return callback(null, true);
    
    if (whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// 3. 显式处理 OPTIONS 预检请求 (解决某些浏览器下 Vercel 函数返回 404 的问题)
app.options('*', (req, res) => {
  res.status(204).end();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 根路径测试 (你之前发现访问 api 域名返回 404，加上这个可以用来排查)
app.get('/', (req, res) => {
  res.send('API is running... (Guonianbao Backend)');
});

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