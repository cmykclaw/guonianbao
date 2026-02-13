## Why

当前亲戚称呼计算功能仅依赖本地 relationship.js 库，对于超长关系链或特殊关系的计算能力有限。需要接入智谱大模型（GLM-4-Flash）来提升计算准确性和覆盖范围，为用户提供更智能的亲戚称呼查询服务。

## What Changes

- 在后端项目中安装 openai 和 dotenv 依赖包
- 在 packages/backend 下创建 .env 文件，添加 ZHIPU_API_KEY 环境变量
- 在 Express 中新增 POST 接口 /api/relatives/calculate
- 调用智谱 GLM-4-Flash 大模型进行亲戚关系计算
- 返回计算结果给前端

## Capabilities

### New Capabilities
- `zhipu-ai-relatives-api`: 智谱大模型亲戚关系计算 API

### Modified Capabilities
- （无）

## Impact

- 新增后端依赖：openai, dotenv
- 新增后端接口：POST /api/relatives/calculate
- 修改 packages/backend 入口文件配置 dotenv
- 新增 .env 配置文件
