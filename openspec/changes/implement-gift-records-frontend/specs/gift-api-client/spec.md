# Spec: gift-api-client

## ADDED Requirements

### Requirement: API 客户端封装
必须封装 API 请求函数。

#### Scenario: 获取记录函数
- **WHEN** 调用 getGiftRecords()
- **THEN** 必须发送 GET 请求到 `http://localhost:3000/api/gifts`
- **AND** 必须返回 GiftRecordDTO 数组
- **AND** 必须使用 fetch API

#### Scenario: 创建记录函数
- **WHEN** 调用 createGiftRecord(data)
- **THEN** 必须发送 POST 请求到 `http://localhost:3000/api/gifts`
- **AND** 请求体必须为 JSON 格式
- **AND** Content-Type 必须为 application/json
- **AND** 必须返回新创建的 GiftRecordDTO

### Requirement: 错误处理
API 请求必须有错误处理。

#### Scenario: 网络错误
- **WHEN** 请求失败（网络错误）
- **THEN** 必须捕获错误
- **AND** 必须显示错误提示（van-toast）

#### Scenario: API 错误响应
- **WHEN** 后端返回错误（4xx/5xx）
- **THEN** 必须解析错误信息
- **AND** 必须显示错误提示

### Requirement: 数据加载状态
必须有加载状态管理。

#### Scenario: 加载中状态
- **WHEN** 发送 API 请求
- **THEN** 必须显示加载中提示（van-loading 或 van-toast）
- **AND** 加载完成后必须隐藏提示
