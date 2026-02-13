# 礼薄功能后端设计

## Context

过年宝后端已经搭建完成（Express + TypeScript + Prisma + SQLite）。现在需要实现礼薄（GiftRecord）功能的后端支持，用于记录送礼/收礼信息。

### 当前状态
- Express 服务已配置
- Prisma ORM 已配置
- 基础路由结构已搭建
- CORS 中间件已配置

## Goals / Non-Goals

**Goals:**
- 设计 GiftRecord 数据模型
- 实现获取所有记录的 API
- 实现创建记录的 API
- 确保 API 能被前端正确调用

**Non-Goals:**
- 复杂的查询过滤功能
- 用户权限控制（后续迭代添加）
- 数据导出功能
- 批量操作 API

## Decisions

### 1. 数据模型设计

**GiftRecord 模型**:
```prisma
model GiftRecord {
  id        String   @id @default(uuid())
  name      String
  type      String   // 'RECEIVED' | 'GIVEN'
  amount    Float
  date      DateTime @default(now())
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**字段说明**:
- `id`: UUID 主键，自动生成
- `name`: 人名（亲戚或朋友），必填
- `type`: 记录类型，'RECEIVED' 表示收礼，'GIVEN' 表示送礼
- `amount`: 金额，使用 Float 支持小数
- `date`: 事件日期，默认当前时间
- `notes`: 备注，可选

**理由**:
- UUID 作为主键避免 ID 冲突
- type 使用 String 枚举而不是 Prisma enum，更灵活
- amount 使用 Float 支持金额小数
- 自动维护 createdAt 和 updatedAt

### 2. API 设计

**GET /api/gifts**
- 返回所有礼薄记录
- 按日期倒序排列（最新的在前）
- 响应格式：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "uuid",
      "name": "张三",
      "type": "RECEIVED",
      "amount": 1000,
      "date": "2024-02-10T00:00:00.000Z",
      "notes": "结婚礼金"
    }
  ]
}
```

**POST /api/gifts**
- 创建新的礼薄记录
- 请求体格式：
```json
{
  "name": "李四",
  "type": "GIVEN",
  "amount": 500,
  "date": "2024-02-11",
  "notes": "生日红包"
}
```
- 响应格式：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "uuid",
    "name": "李四",
    "type": "GIVEN",
    "amount": 500,
    "date": "2024-02-11T00:00:00.000Z",
    "notes": "生日红包",
    "createdAt": "2024-02-11T10:00:00.000Z",
    "updatedAt": "2024-02-11T10:00:00.000Z"
  }
}
```

**理由**:
- RESTful 设计，使用标准 HTTP 方法
- 统一的 API 响应格式
- 日期字段使用 ISO 8601 格式

### 3. 架构分层

**目录结构**:
```
backend/src/
├── controllers/
│   └── gift.controller.ts    # 处理 HTTP 请求
├── services/
│   └── gift.service.ts       # 业务逻辑层
├── routes/
│   └── gift.routes.ts        # 路由定义
└── types/
    └── gift.types.ts         # 类型定义（可选）
```

**理由**:
- 控制器层负责 HTTP 相关（请求/响应处理）
- 服务层负责业务逻辑和数据库操作
- 路由层负责 URL 映射
- 符合现有项目结构

### 4. CORS 配置

**当前状态**: CORS 已全局配置

**配置详情**:
```typescript
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))
```

**理由**:
- 前端开发服务器运行在 localhost:5173
- 允许携带 credentials（后续需要）
- 生产环境需要更新为实际域名

### 5. 共享类型

需要在 `shared` 包中添加 GiftRecord 相关类型：

```typescript
// shared/src/types/index.ts
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

export interface CreateGiftRecordRequest {
  name: string
  type: 'RECEIVED' | 'GIVEN'
  amount: number
  date?: string
  notes?: string
}
```

**理由**:
- 前后端共享类型定义
- 确保 API 契约一致性
- DTO 中的 date 使用 string 便于 JSON 序列化

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| 数据类型不匹配 | 使用 DTO 和验证确保类型安全 |
| 时区问题 | 使用 ISO 8601 格式，前端负责显示转换 |
| 并发创建冲突 | UUID 主键避免 ID 冲突 |
| 金额精度 | Float 可能精度丢失，后续可改为 Int（分） |

## Migration Plan

1. 更新 shared 包类型定义
2. 修改 Prisma schema 添加 GiftRecord 模型
3. 运行数据库迁移
4. 创建 GiftRecord 服务层
5. 创建 GiftRecord 控制器
6. 配置路由
7. 测试 API 端点

## Open Questions

1. 是否需要数据验证库（如 Zod）？
2. 是否需要分页功能（记录可能很多）？
3. 是否需要软删除功能？
4. 是否需要支持修改和删除记录？
