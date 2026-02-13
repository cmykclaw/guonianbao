import type { GiftRecordDTO, CreateGiftRecordRequest } from '@guonianbao/shared'

// const API_BASE = 'http://localhost:3000/api'
const API_BASE = 'https://guonianbao-backend.vercel.app/api'

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

/**
 * 获取所有礼薄记录
 */
export async function getGiftRecords(): Promise<GiftRecordDTO[]> {
  try {
    const response = await fetch(`${API_BASE}/gifts`, {
      headers: getAuthHeaders(),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.code !== 200) {
      throw new Error(result.message || '获取数据失败')
    }
    
    return result.data
  } catch (error) {
    console.error('Error fetching gift records:', error)
    throw error
  }
}

/**
 * 创建新的礼薄记录
 */
export async function createGiftRecord(data: CreateGiftRecordRequest): Promise<GiftRecordDTO> {
  try {
    const response = await fetch(`${API_BASE}/gifts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.code !== 200) {
      throw new Error(result.message || '创建记录失败')
    }
    
    return result.data
  } catch (error) {
    console.error('Error creating gift record:', error)
    throw error
  }
}
