## Why

当前的"礼薄"功能没有用户认证，任何人都可以查看和修改所有记录。需要添加 JWT 认证和数据隔离，确保用户只能管理自己的礼薄记录。

## What Changes

- 安装 jsonwebtoken 和 bcryptjs 依赖
- Prisma 数据库：新增 User 模型，GiftRecord 增加 userId 关联
- 创建 auth 中间件：验证 JWT Token
- 创建认证接口：POST /api/auth/register, POST /api/auth/login
- 改造 gifts 接口：添加认证和数据隔离

## Capabilities

### New Capabilities
- `user-auth`: 用户注册登录认证
- `gift-auth`: 礼薄数据隔离

### Modified Capabilities
- （无）

## Impact

- 新增依赖：jsonwebtoken, bcryptjs
- 新增数据库模型：User
- 修改数据库模型：GiftRecord 添加 userId
- 新增中间件：auth.ts
- 新增路由：auth.ts
- 修改路由：gifts.ts
