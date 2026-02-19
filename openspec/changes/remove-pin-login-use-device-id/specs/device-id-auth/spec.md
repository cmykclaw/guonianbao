## ADDED Requirements

### Requirement: 设备 ID 自动登录
系统 SHALL 使用设备 ID 自动完成用户认证，无需 PIN 码。

#### Scenario: 首次访问（设备不存在）
- **WHEN** 用户首次访问页面，设备 ID 不存在于数据库
- **THEN** 系统自动创建设备记录，返回 token，前端保存 token 并跳转首页

#### Scenario: 再次访问（设备已存在）
- **WHEN** 用户再次访问页面，设备 ID 已存在于数据库
- **THEN** 系统直接返回 token，前端保存 token 并跳转首页

#### Scenario: 页面加载时自动登录
- **WHEN** 用户打开登录页面
- **THEN** 系统自动获取/创建设备 ID，调用 check-device 接口，完成登录

### Requirement: 移除 PIN 码 UI
系统 SHALL 移除 PIN 码输入相关的所有 UI 组件。

#### Scenario: 登录页面不再显示密码输入
- **WHEN** 用户打开登录页面
- **THEN** 页面不显示 PIN 码输入框和数字键盘

### Requirement: API 接口简化
系统 SHALL 简化为只有 check-device 一个认证接口。

#### Scenario: check-device 接口返回 token
- **WHEN** 前端调用 POST /api/auth/check-device
- **THEN** 后端返回 { token, deviceId }

#### Scenario: 删除 register-pin 接口
- **WHEN** 前端调用 POST /api/auth/register-pin
- **THEN** 接口已删除，返回 404

#### Scenario: 删除 verify-pin 接口
- **WHEN** 前端调用 POST /api/auth/verify-pin
- **THEN** 接口已删除，返回 404
