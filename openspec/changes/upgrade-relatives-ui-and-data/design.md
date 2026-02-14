## Context

当前 RelativesView.vue 使用 van-tabs 展示亲戚分类，数据结构较为简单。需要升级为更专业的折叠面板展示方式，并扩充亲戚关系数据。

## Goals / Non-Goals

**Goals:**
- 使用 van-collapse 折叠面板替换 van-tabs
- 重构数据结构，使用 category 字段分类
- 扩充更全面的亲戚关系数据

**Non-Goals:**
- 不修改搜索、AI 计算等核心逻辑
- 不添加新的 API 调用

## Decisions

1. **使用折叠面板替代 tabs**
   - 折叠面板更适合展示分类清晰的内容
   - 用户可自主选择展开/收起，交互更友好
   - accordion 模式保证一次只展开一个分类

2. **使用计算属性进行分类过滤**
   - group1-group4 四个计算属性分别对应四个分类
   - 搜索过滤逻辑依然可以复用

## Risks / Trade-offs

- 折叠面板在移动端体验良好，风险较低
