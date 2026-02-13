# Spec: cors-configuration

## ADDED Requirements

### Requirement: CORS 中间件配置
Express 应用必须配置 CORS 中间件，允许前端跨域访问。

#### Scenario: 允许前端开发服务器访问
- **WHEN** 前端应用运行在 `http://localhost:5173`
- **THEN** 后端 API 必须接受来自该域名的请求
- **AND** 必须正确处理预检请求（OPTIONS）

#### Scenario: 支持 credentials
- **WHEN** 前端请求需要携带 credentials（如 cookies）
- **THEN** CORS 配置必须允许 credentials
- **AND** Access-Control-Allow-Credentials 头必须设置为 true

#### Scenario: 允许的 HTTP 方法
- **WHEN** 前端发送 GET 或 POST 请求
- **THEN** CORS 必须允许这些方法
- **AND** 预检请求必须返回允许的 methods 列表

#### Scenario: 响应头暴露
- **WHEN** 前端需要读取特定的响应头
- **THEN** CORS 配置必须暴露必要的响应头
- **AND** Access-Control-Expose-Headers 必须正确配置

### Requirement: 全局 CORS 配置
CORS 中间件必须应用到所有路由。

#### Scenario: 应用到所有 API 路由
- **WHEN** 访问任何 /api/* 路由
- **THEN** CORS 头必须包含在响应中
- **AND** 跨域请求必须正常工作
