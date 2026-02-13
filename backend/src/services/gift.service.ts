import { prisma } from '../config/database'
import type { GiftRecordDTO, CreateGiftRecordRequest } from '@guonianbao/shared'

/**
 * 获取所有礼薄记录
 * 按日期倒序排列（最新的在前）
 */
export async function getAllGifts(): Promise<GiftRecordDTO[]> {
  try {
    const records = await prisma.giftRecord.findMany({
      orderBy: {
        date: 'desc',
      },
    })

    return records.map((record) => ({
      id: record.id,
      name: record.name,
      type: record.type as 'RECEIVED' | 'GIVEN',
      amount: record.amount,
      date: record.date.toISOString(),
      notes: record.notes || undefined,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching gift records:', error)
    throw new Error('Failed to fetch gift records')
  }
}

/**
 * 创建新的礼薄记录
 */
export async function createGift(data: CreateGiftRecordRequest): Promise<GiftRecordDTO> {
  try {
    // 验证必填字段
    if (!data.name || !data.type || data.amount === undefined) {
      throw new Error('Missing required fields: name, type, amount')
    }

    // 验证 type 字段值
    if (data.type !== 'RECEIVED' && data.type !== 'GIVEN') {
      throw new Error('Invalid type value. Must be RECEIVED or GIVEN')
    }

    // 验证 amount 是数字
    if (typeof data.amount !== 'number' || isNaN(data.amount)) {
      throw new Error('Amount must be a valid number')
    }

    const record = await prisma.giftRecord.create({
      data: {
        name: data.name,
        type: data.type,
        amount: data.amount,
        date: data.date ? new Date(data.date) : new Date(),
        notes: data.notes,
      },
    })

    return {
      id: record.id,
      name: record.name,
      type: record.type as 'RECEIVED' | 'GIVEN',
      amount: record.amount,
      date: record.date.toISOString(),
      notes: record.notes || undefined,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error('Error creating gift record:', error)
    throw error
  }
}