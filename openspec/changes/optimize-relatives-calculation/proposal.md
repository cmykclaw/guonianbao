## Why

当前亲戚称呼计算功能无法处理超长关系链（如"老婆的爷爷的堂姐的外孙女"），relationship.js 对复杂链式关系的直接计算会返回空结果。需要通过前端算法升级，实现链式降维计算，榨干 relationship.js 的计算能力。

## What Changes

- 新增 `calculateComplexRelation(inputStr)` 工具函数，实现链式降维算法
- 优化 `calculatedResults` computed 属性，调用新的计算函数
- 处理算法链条断裂的降级逻辑
- 支持超长关系链的逐步计算

## Capabilities

### New Capabilities
- `chain-reduction-algorithm`: 链式降维计算算法，用于处理超长亲戚关系链

### Modified Capabilities
- `relatives-calculator`: 修改计算逻辑，使用链式降维算法替代直接计算

## Impact

- 修改 `packages/frontend/src/views/RelativesView.vue`
- 无新增依赖
- 纯前端算法优化，无需后端配合
