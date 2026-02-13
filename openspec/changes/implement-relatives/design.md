## Context

当前项目为"过年宝"移动端 Web 应用，使用 Vue 3 + Vant 4 + TypeScript。用户需要在走亲访友时能快速查询亲戚称呼。现有的 Relatives 页面功能单一，仅有静态列表，无法满足以下需求：
1. 复杂亲戚关系的动态计算（如"妈妈的兄弟的女儿"）
2. 模糊搜索功能
3. 按父族伴侣族分类/母族/快速查找

本设计旨在结合静态速查表与动态关系计算库，提供极致的用户体验。

## Goals / Non-Goals

**Goals:**
- 实现"亲戚称呼速查"功能，用户可在 3 秒内找到答案
- 采用"模糊搜索 + 分类速查表"的 UI 交互
- 安装并集成 relationship.js 库用于动态计算
- 提供 20+ 条常用亲戚关系的静态数据
- 界面干净、喜庆，适合手机单手操作

**Non-Goals:**
- 不涉及后端 API，纯前端实现
- 不支持非中文亲戚关系称呼
- 不实现亲戚关系图的增删改查

## Decisions

### 1. 技术选型：relationship.js
- **选择**: relationship.js (npm: relationship.js)
- **理由**: 开源且广泛使用的中文亲戚关系计算库，支持动态计算复杂关系
- **替代方案**: 
  - 自建关系计算逻辑 - 工作量大且容易遗漏边界情况
  - 使用其他库如 chinese-relations - 功能不如 relationship.js 完善

### 2. 数据管理策略
- **选择**: 本地 JSON 数组 + relationship.js 动态计算
- **理由**: 
  - 静态数据覆盖常见关系，响应速度快
  - relationship.js 处理复杂动态关系
  - 两者互补，提供最佳用户体验

### 3. UI 交互设计
- **选择**: van-search + van-tabs + van-cell-group/van-grid
- **理由**: Vant 组件成熟、稳定，符合移动端交互习惯

### 4. 搜索策略
- **选择**: 模糊匹配（包含匹配）
- **理由**: 用户可能只记得部分关键词，模糊匹配更灵活

## Risks / Trade-offs

| 风险 | 描述 | 缓解措施 |
|------|------|----------|
| relationship.js 计算结果为空 | 某些复杂关系可能无法计算 | 显示 van-empty 缺省图，提示"关系太复杂，算不出来啦" |
| 静态数据不全面 | 用户查询的关系不在静态数据中 | 依赖 relationship.js 动态计算作为补充 |
| 搜索性能问题 | 数据量大时搜索可能慢 | 20+ 条数据量较小，使用 Vue computed 足够 |

## Migration Plan

1. 安装 relationship.js 依赖
2. 创建 RelativesView.vue 组件
3. 在路由中替换原有 Relatives 组件
4. 测试搜索和计算功能
5. 验证 20+ 条静态数据显示正常

## Open Questions

- 是否需要支持称呼的多种方言变体（如"大爷" vs "伯父"）？
  - 初步方案：静态数据中已包含多种称呼（如"伯父 / 大爷"），relationship.js 返回多种结果时全部展示
