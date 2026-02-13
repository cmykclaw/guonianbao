## Context

当前"礼薄"功能无用户认证，需要添加 JWT 认证和数据隔离。

## Goals / Non-Goals

**Goals:**
- 用户注册和登录
- JWT Token 签发和验证
- 礼薄数据隔离（用户只能查看/修改自己的记录）

**Non-Goals:**
- 不修改前端代码
- 不实现复杂的权限管理

## Decisions

### 1. 技术选型
- **JWT**: jsonwebtoken 库
- **密码加密**: bcryptjs
- **密钥**: 从 .env 读取 JWT_SECRET

### 2. 数据库设计
- User: id, username, password, createdAt
- GiftRecord: 添加 userId，与 User 关联

### 3. 中间件设计
- 从 Authorization header 提取 Bearer token
- 验证失败返回 401

## Risks / Trade-offs

| 风险 | 描述 | 缓解措施 |
|------|------|----------|
| Token 泄漏 | JWT 泄露风险 | 短期有效（7天） |
