# Spec: gift-records-api

## ADDED Requirements

### Requirement: 获取所有记录 API
必须提供 GET /api/gifts 端点，返回所有礼薄记录。

#### Scenario: API 端点可用
- **WHEN** 发送 GET 请求到 `/api/gifts`
- **THEN** 必须返回 HTTP 200 状态码
- **AND** 响应体必须包含 code、message、data 字段
- **AND** data 必须是 GiftRecordDTO 数组

#### Scenario: 记录按时间倒序排列
- **WHEN** 数据库中存在多条记录
- **THEN** GET /api/gifts 返回的记录必须按 date 字段倒序排列
- **AND** 最新的记录必须排在最前面

#### Scenario: 空记录列表
- **WHEN** 数据库中没有记录
- **THEN** GET /api/gifts 必须返回空数组
- **AND** HTTP 状态码仍为 200

### Requirement: 创建记录 API
必须提供 POST /api/gifts 端点，用于创建新的礼薄记录。

#### Scenario: 成功创建记录
- **WHEN** 发送 POST 请求到 `/api/gifts`
- **AND** 请求体包含有效的 name、type、amount 字段
- **THEN** 必须返回 HTTP 200 状态码
- **AND** 响应体必须包含新创建的记录
- **AND** 记录必须保存到数据库

#### Scenario: 验证必填字段
- **WHEN** 发送 POST 请求到 `/api/gifts`
- **AND** 请求体缺少 name、type 或 amount 字段
- **THEN** 必须返回 HTTP 400 状态码
- **AND** 响应体必须包含错误信息

#### Scenario: 验证金额类型
- **WHEN** 发送 POST 请求到 `/api/gifts`
- **AND** amount 字段不是数字
- **THEN** 必须返回 HTTP 400 状态码
- **AND** 响应体必须包含错误信息

#### Scenario: 验证 type 字段值
- **WHEN** 发送 POST 请求到 `/api/gifts`
- **AND** type 字段不是 'RECEIVED' 或 'GIVEN'
- **THEN** 必须返回 HTTP 400 状态码
- **AND** 响应体必须包含错误信息

### Requirement: API 响应格式
所有 API 响应必须使用统一的格式。

#### Scenario: 成功响应格式
- **WHEN** API 调用成功
- **THEN** 响应体必须包含：
  - `code`: 200
  - `message`: "success"
  - `data`: 实际数据

#### Scenario: 错误响应格式
- **WHEN** API 调用失败
- **THEN** 响应体必须包含：
  - `code`: 错误码（如 400, 500）
  - `message`: 错误描述
  - `details?`: 详细错误信息（可选）
