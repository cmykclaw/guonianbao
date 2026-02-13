## Why

用户需要一个智能生成拜年锦囊和应对亲戚问答的功能。当前系统缺少这类 AI 生成能力，需要新增后端接口来提供拜年文案生成和高情商回复建议。

## What Changes

- 在 Express 中新增 POST /api/tips/generate 接口
- 接收 type (greeting/comeback) 和 context 参数
- 使用已配置好的 OpenAI 客户端调用智谱 GLM-4-Flash 模型
- 根据 type 类型使用不同的 System Prompt
- 解析 AI 返回的 JSON 数组并返回给前端

## Capabilities

### New Capabilities
- `tips-ai-api`: 拜年锦囊 AI 生成接口

### Modified Capabilities
- （无）

## Impact

- 新增后端路由：POST /api/tips/generate
- 复用已有的 OpenAI 客户端配置
- 新增 tips.routes.ts 文件
