## ADDED Requirements

### Requirement: 确保请求前 deviceId 存在
系统 SHALL 在发起 /api/auth/register-pin 请求前，确保 localStorage 中存在 deviceId。

#### Scenario: deviceId 存在时
- **WHEN** localStorage 中已有 deviceId
- **THEN** 直接使用已有 deviceId 发起请求

#### Scenario: deviceId 不存在时
- **WHEN** localStorage 中没有 deviceId
- **THEN** 生成新 deviceId 并保存到 localStorage，然后发起请求
