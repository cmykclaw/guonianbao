## Why

简化认证方案，使用设备 ID + 4 位 PIN 码替代传统账号密码，更适合移动端应用。

## What Changes

- 修改 Prisma User 模型：删除 username/phone/email，保留 deviceId + pin
- 重构认证接口：check-device, register-pin, verify-pin
- 保持 JWT 认证和数据隔离

## Capabilities

### New Capabilities
- `device-pin-auth`: 设备 PIN 码认证

### Modified Capabilities
- （无）

## Impact

- 修改 prisma/schema.prisma
- 修改 src/routes/auth.ts
- 无需修改前端和中间件
