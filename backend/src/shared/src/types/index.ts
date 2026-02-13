/**
 * API响应基础类型
 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/**
 * API错误响应
 */
export interface ApiError {
  code: number
  message: string
  details?: string
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应数据
 */
export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 分页API响应
 */
export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>

/**
 * 用户信息DTO
 */
export interface UserDTO {
  id: string
  nickname: string
  avatar?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

/**
 * 创建用户请求
 */
export interface CreateUserRequest {
  nickname: string
  phone?: string
}

/**
 * 更新用户请求
 */
export interface UpdateUserRequest {
  nickname?: string
  avatar?: string
}

/**
 * HTTP方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * API路由配置
 */
export interface RouteConfig {
  path: string
  method: HttpMethod
  handler: string
  middleware?: string[]
}

/**
 * 礼薄记录DTO
 */
export interface GiftRecordDTO {
  id: string
  name: string
  type: 'RECEIVED' | 'GIVEN'
  amount: number
  date: string
  notes?: string
  createdAt: string
  updatedAt: string
}

/**
 * 创建礼薄记录请求
 */
export interface CreateGiftRecordRequest {
  name: string
  type: 'RECEIVED' | 'GIVEN'
  amount: number
  date?: string
  notes?: string
}