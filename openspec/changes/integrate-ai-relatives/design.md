## Context

当前 RelativesView.vue 使用 relationship.js 进行本地计算，对于复杂关系链计算能力有限。后端已提供 /api/relatives/calculate AI 接口，需要重构前端以接入 AI 能力，同时优化用户体验。

## Goals / Non-Goals

**Goals:**
- 实现 500ms 防抖，避免频繁触发计算
- 清洗输入字符串（去除首尾空格、末尾多余的"の"）
- 实现"三级火箭"计算逻辑：本地 → AI → 兜底
- 添加加载状态和错误处理

**Non-Goals:**
- 不修改后端 API
- 不实现其他 AI 模型接入

## Decisions

### 1. 防抖实现
- **选择**: 手写 useDebounceFn（不引入 lodash-es）
- **理由**: 减少依赖体积，功能简单无需完整 lodash

### 2. API 端点
- **选择**: http://localhost:3000/api/relatives/calculate
- **理由**: 后端已实现，直接调用

### 3. 计算流程
- 第一级：本地 relationship.js + 静态数据
- 第二级：AI API 调用（本地失败后）
- 第三级：van-empty 兜底 UI

## Risks / Trade-offs

| 风险 | 描述 | 缓解措施 |
|------|------|----------|
| API 请求慢 | 网络延迟 | 显示加载状态 |
| API 报错 | 网络问题 | 展示友好错误消息 |
| 输入无效 | 空字符串 | 清洗后为空则 return |

## Migration Plan

1. 重构 RelativesView.vue
2. 添加防抖和输入清洗
3. 实现三级火箭计算逻辑
4. 添加 loading 和错误 UI
5. 测试验证

## Open Questions

- API 地址硬编码还是配置？
  - 初步方案：硬编码，开发环境先用 localhost
