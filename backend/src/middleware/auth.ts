import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export interface AuthRequest extends Request {
  user?: {
    userId: string
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  // 增加一个运行时的严谨检查
  if (!JWT_SECRET) {
    console.error('[Auth] 严重错误: 环境变量 JWT_SECRET 未定义！');
    return res.status(500).json({ error: '服务器配置错误' });
  }

  const authHeader = req.headers.authorization

if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[Auth] 401 原因: Authorization Header 缺失或格式错误');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7)

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as { userId: string }
    req.user = { userId: decoded.userId }
    next()
  } catch (err: any) {
    // 打印具体的 JWT 报错原因，如 "jwt expired" 或 "invalid signature"
    console.log('[Auth] 401 原因: Token 验证失败 -', err.message);
    return res.status(401).json({ error: 'Invalid token' })
  }
}
