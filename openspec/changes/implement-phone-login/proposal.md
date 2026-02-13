## Why

用户需要使用手机号验证码登录"过年宝"应用，替代原有的账号密码方式。提供更便捷的登录体验。

## What Changes

- 创建 LoginView.vue 手机号验证码登录页面
- 实现发送验证码功能（POST /api/auth/send-code）
- 实现倒计时机制
- 实现验证码登录功能（POST /api/auth/login）
- 保存 Token 并跳转

## Capabilities

### New Capabilities
- `phone-login`: 手机号验证码登录

### Modified Capabilities
- （无）

## Impact

- 新增 frontend/src/views/LoginView.vue
- 修改路由配置
