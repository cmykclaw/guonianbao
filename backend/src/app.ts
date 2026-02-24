import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './middleware/error.middleware'

export const app = express()

// 1. 定义固定白名单
const whitelist = [
  'https://guonianbao.fun',
  'https://www.guonianbao.fun',
  'http://localhost:5173'
]

// 2. 配置更灵活的 CORS 逻辑
app.use(cors({
  origin: (origin, callback) => {
    // 允许没有 origin 的请求（如移动端）
    if (!origin) return callback(null, true);

    // 校验逻辑：
    const isWhitelisted = whitelist.includes(origin);
    // 重点：允许任何以 .vercel.app 结尾的域名（解决预览链接问题）
    const isVercelPreview = origin.endsWith('.vercel.app');
    // 重点：允许任何包含你自定义域名的请求
    const isCustomDomain = origin.endsWith('guonianbao.fun');

    if (isWhitelisted || isVercelPreview || isCustomDomain || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      // 这里的错误信息能帮你快速定位非法来源
      callback(new Error(`Not allowed by CORS: ${origin}`));
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