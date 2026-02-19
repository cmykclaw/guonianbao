## Why

移除 PIN 码登录功能，改用设备 ID 自动认证。用户首次访问时自动创建设备记录，后续直接使用设备 ID 作为身份标识，无需输入 PIN 码，简化登录流程。

## What Changes

- **前端**：
  - 删除 PIN 码输入 UI（van-password-input、van-number-keyboard）
  - 删除注册/验证 PIN 的 API 调用逻辑
  - 改为自动获取/创建设备 ID 并直接登录

- **后端**：
  - 删除 /api/auth/register-pin 接口
  - 删除 /api/auth/verify-pin 接口
  - 修改 /api/auth/check-device 接口：设备不存在时自动创建，并返回 token
  - 数据库：使用 deviceId 作为主键

## Capabilities

### New Capabilities
- device-id-auth: 使用设备 ID 自动认证，无需 PIN 码

### Modified Capabilities
- (无)

## Impact

- 修改前端：packages/frontend/src/views/LoginView.vue
- 修改后端：backend/src/routes/auth.routes.ts
- 数据库表结构变更（使用 deviceId 作为主键）
