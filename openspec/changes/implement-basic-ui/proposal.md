# 过年宝 - 基础UI布局实现

## Why

过年宝项目需要实现基础的移动端UI布局，包括底部导航栏和主要功能页面。这是用户体验的基础，需要在开始业务功能开发之前完成。

## What Changes

- 在 App.vue 中实现底部标签导航栏（使用 Vant UI 的 Tabbar 组件）
- 创建三个功能页面的占位组件：
  - 礼薄 (Gift Records) - 管理礼金记录
  - 锦囊 (Tips) - 提供过年建议
  - 亲戚 (Relatives) - 管理亲戚关系
- 配置 Vue Router 路由系统
- 集成 Vant UI 样式和图标
- 确保移动端适配和响应式布局

## Capabilities

### New Capabilities
- `bottom-navigation`: 底部标签栏导航，包含三个主要功能入口
- `gift-records`: 礼薄功能页面，用于记录和管理送礼/收礼信息
- `tips-page`: 锦囊功能页面，提供过年建议和指南
- `relatives-page`: 亲戚功能页面，管理亲戚关系网络

### Modified Capabilities
- （无现有spec需要修改）

## Impact

- 前端项目结构变更
- 新增三个视图组件
- 更新路由配置
- 修改 App.vue 根组件
- 引入 Vant UI 的 Tabbar 和 Icon 组件
- 不需要后端API变更（纯前端UI实现）
