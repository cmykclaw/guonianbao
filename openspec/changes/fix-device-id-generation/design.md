## Context

前端 LoginView.vue 发起 /api/auth/register-pin 请求时，可能 localStorage 中没有 deviceId，导致发送空值。

## Goals / Non-Goals

**Goals:**
- 在发起注册 PIN 请求前确保 deviceId 存在

**Non-Goals:**
- 不修改后端逻辑

## Decisions

1. **在请求前生成 deviceId**
   - 检查 localStorage.getItem('deviceId')
   - 如果为空，使用 Date.now().toString() + Math.random().toString(36).substring(2) 生成
   - 生成后保存到 localStorage

## Risks / Trade-offs

- 无风险
