## Why

过年期间走亲访友时，用户经常不知道该如何称呼复杂的亲戚关系（如"妈妈的兄弟的女儿"、"老婆的弟弟"等）。现有的简单列表无法满足动态计算需求。我们需要一个智能的亲戚称呼查询工具，结合静态速查表和动态关系计算，让用户在3秒内找到正确答案。

## What Changes

- 安装 relationship.js 库用于计算复杂亲戚关系
- 创建 RelativesView.vue 组件替换原有的 Relatives 页面
- 定义 20+ 条常用亲戚关系静态数据（覆盖父族、母族、伴侣族）
- 实现模糊搜索功能，支持按关系描述和称呼匹配
- 实现分类速查表（van-tabs）：爸爸这边、妈妈这边、伴侣这边
- 集成 relationship.js 动态计算复杂关系
- 实现搜索结果与速查表的切换逻辑
- 添加空状态提示（关系太复杂时）

## Capabilities

### New Capabilities
- `relatives-search`: 模糊搜索功能，支持关系描述和称呼匹配
- `relatives-categories`: 分类速查表展示（父族、母族、伴侣族）
- `relatives-calculator`: 使用 relationship.js 动态计算复杂亲戚关系
- `relatives-data`: 静态亲戚关系数据管理（20+条基础关系）

### Modified Capabilities
- （无现有 spec 需要修改）

## Impact

- 新增前端页面组件 RelativesView.vue
- 新增依赖 relationship.js
- 更新路由配置，替换原有的 Relatives 组件
- 纯前端实现，无需后端 API 支持
- 提升用户体验，解决春节走亲访友时的称呼难题
