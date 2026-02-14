## Context

之前的折叠面板改版效果不理想，需要回滚到原来的 tabs 版本。

## Goals / Non-Goals

**Goals:**
- 恢复 RelativesView.vue 到原来的 tabs 版本

**Non-Goals:**
- 不添加新功能

## Decisions

1. **直接回滚到原版本**
   - 恢复 van-tabs 结构
   - 恢复原有的 Relative 接口和数据结构
   - 恢复 fatherRelatives、motherRelatives、spouseRelatives 计算属性

## Risks / Trade-offs

- 无风险
