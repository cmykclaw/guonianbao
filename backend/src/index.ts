import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

const PORT = process.env.PORT || 3000

// 仅在非 Vercel Serverless 环境下（本地或传统服务器）启动监听
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
  })
}

// 必须导出 app，供 Vercel Serverless 引擎调用
export default app