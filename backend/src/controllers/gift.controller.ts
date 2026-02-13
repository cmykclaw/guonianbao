import type { Request, Response } from 'express'
import type { ApiResponse, CreateGiftRecordRequest } from '@guonianbao/shared'
import * as giftService from '../services/gift.service'

/**
 * 获取所有礼薄记录
 */
export async function getGifts(req: Request, res: Response): Promise<void> {
  try {
    const records = await giftService.getAllGifts()
    
    const response: ApiResponse<typeof records> = {
      code: 200,
      message: 'success',
      data: records,
    }
    
    res.json(response)
  } catch (error) {
    console.error('Error in getGifts controller:', error)
    
    const response: ApiResponse<null> = {
      code: 500,
      message: 'Failed to fetch gift records',
      data: null,
    }
    
    res.status(500).json(response)
  }
}

/**
 * 创建新的礼薄记录
 */
export async function createGift(req: Request, res: Response): Promise<void> {
  try {
    let { name, type, amount, date, notes } = req.body

    // 验证必填字段
    if (!name || !type || amount === undefined || amount === null || amount === '') {
      const response: ApiResponse<null> = {
        code: 400,
        message: 'Missing required fields: name, type, amount',
        data: null,
      }
      res.status(400).json(response)
      return
    }

    // 验证 type 字段值
    if (type !== 'RECEIVED' && type !== 'GIVEN') {
      const response: ApiResponse<null> = {
        code: 400,
        message: 'Invalid type value. Must be RECEIVED or GIVEN',
        data: null,
      }
      res.status(400).json(response)
      return
    }

    // 将 amount 转换为数字
    const numericAmount = Number(amount)
    
    // 验证 amount 是有效的数字
    if (isNaN(numericAmount) || numericAmount <= 0) {
      const response: ApiResponse<null> = {
        code: 400,
        message: 'Amount must be a valid positive number',
        data: null,
      }
      res.status(400).json(response)
      return
    }

    const data: CreateGiftRecordRequest = {
      name,
      type,
      amount: numericAmount,
      date,
      notes,
    }

    const record = await giftService.createGift(data)
    
    const response: ApiResponse<typeof record> = {
      code: 200,
      message: 'success',
      data: record,
    }
    
    res.status(200).json(response)
  } catch (error) {
    console.error('Error in createGift controller:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to create gift record'
    
    const response: ApiResponse<null> = {
      code: 500,
      message: errorMessage,
      data: null,
    }
    
    res.status(500).json(response)
  }
}