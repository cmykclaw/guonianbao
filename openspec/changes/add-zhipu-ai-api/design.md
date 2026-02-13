## Context

当前项目后端使用 Express 框架，需要新增一个调用智谱大模型的 API 接口，用于计算亲戚称呼。该接口将作为前端 relationship.js 的补充，提供更强大的智能计算能力。

## Goals / Non-Goals

**Goals:**
- 安装 openai 和 dotenv 依赖
- 配置智谱 API 环境变量
- 创建 POST /api/relatives/calculate 接口
- 调用 GLM-4-Flash 大模型进行亲戚关系计算
- 返回标准 JSON 格式结果

**Non-Goals:**
- 不修改现有前端代码
- 不实现其他大模型接入
- 不处理复杂的对话上下文

## Decisions

### 1. API SDK 选择
- **选择**: openai SDK (兼容智谱 API)
- **理由**: 智谱 API 与 OpenAI 兼容，使用 openai SDK 可以直接对接
- **baseURL**: https://open.bigmodel.cn/api/paas/v4/

### 2. Prompt 设计
- **系统预设**: 中国亲属关系称呼专家，只输出称呼本身，无标点无解释
- **用户输入**: 前端传来的 relation 字段

### 3. 错误处理
- **选择**: try-catch 包裹，捕获异常返回错误信息
- **理由**: 保证接口稳定性，不会因大模型调用失败导致服务崩溃

## Risks / Trade-offs

| 风险 | 描述 | 缓解措施 |
|------|------|----------|
| API 调用失败 | 网络问题或 API 限流 | 返回错误信息，前端可降级到本地计算 |
| 响应超时 | 大模型响应慢 | 设置合理超时时间 |
| API Key 泄露 | .env 文件提交到仓库 | 已添加到 .gitignore |

## Migration Plan

1. 安装依赖：npm install openai dotenv
2. 创建 .env 文件，配置 ZHIPU_API_KEY
3. 在入口文件顶部加载 dotenv
4. 初始化 OpenAI 客户端
5. 创建 /api/relatives/calculate 接口
6. 测试接口功能

## Open Questions

- 是否需要缓存大模型计算结果？
  - 初步方案：暂不加缓存，保持实现简单
