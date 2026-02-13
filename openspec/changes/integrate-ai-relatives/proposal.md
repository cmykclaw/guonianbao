## Why

当前亲戚称呼功能依赖本地 relationship.js 库，对于超长关系链计算能力有限。后端已提供 /api/relatives/calculate AI 接口，需要重构前端以接入 AI 能力，同时优化用户体验（防抖、输入清洗）。

## What Changes

- 引入防抖逻辑（500ms），避免频繁触发计算
- 清洗输入字符串（去除首尾空格、末尾多余的"の"）
- 新增 isAILoading 响应式状态
- 实现"三级火箭"计算逻辑：本地计算 → AI 计算 → 兜底 UI
- 添加 van-loading 加载状态
- 完善错误处理和网络异常兜底

## Capabilities

### New Capabilities
- `ai-relatives-integration`: AI 亲戚称呼计算前端集成

### Modified Capabilities
- `relatives-calculator`: 修改计算逻辑，集成 AI 兜底

## Impact

- 修改 packages/frontend/src/views/RelativesView.vue
- 新增后端 API 调用
- 无新增前端依赖（手写防抖）
