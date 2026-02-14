## Why

前端发往 /api/auth/register-pin 的请求中，如果 localStorage 中没有 deviceId，会发送空值导致后端返回 400 报错。需要在发起请求前确保 deviceId 存在。

## What Changes

- 修改 LoginView.vue 中的注册 PIN 请求逻辑
- 在发起 POST 请求前检查 localStorage 是否有 deviceId
- 如果没有则立即生成一个（使用 Date.now().toString() + Math.random().toString(36).substring(2)）

## Capabilities

### New Capabilities
- device-id-generation: 前端 deviceId 生成逻辑修复

### Modified Capabilities
- (无)

## Impact

- 修改文件：`packages/frontend/src/views/LoginView.vue`
