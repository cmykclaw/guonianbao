import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../shared'

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err)

  if ('code' in err && typeof err.code === 'number') {
    return res.status(err.code >= 400 && err.code < 600 ? err.code : 500).json({
      code: err.code,
      message: err.message,
      details: (err as ApiError).details
    })
  }

  res.status(500).json({
    code: 500,
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
}