# 基础UI布局设计

## Context

过年宝前端项目已经初始化完成（Vue 3 + Vite + TypeScript + Vant UI）。现在需要实现基础的底部导航布局，为用户提供三个主要功能的入口。

### 当前状态
- 前端项目结构已搭建
- Vant UI 已集成（按需导入）
- Vue Router 已配置基础路由
- App.vue 目前只有简单的 router-view

## Goals / Non-Goals

**Goals:**
- 实现底部标签栏导航布局
- 配置三个功能页面的路由
- 创建占位视图组件
- 确保移动端适配

**Non-Goals:**
- 具体业务功能实现（数据展示、表单等）
- 后端API集成
- 复杂的状态管理
- 动画和过渡效果

## Decisions

### 1. 使用 Vant Tabbar 组件

**决策**: 使用 Vant 的 `Tabbar` 和 `TabbarItem` 组件实现底部导航。

**理由**:
- 专为移动端设计，样式符合设计规范
- 支持图标和文字，符合需求
- 自动处理激活状态
- 提供良好的触摸体验

**图标选择**:
- 礼薄: `records` 图标（记录/文档）
- 锦囊: `guide-o` 图标（指南/提示）
- 亲戚: `friends-o` 图标（人脉/关系）

### 2. 路由结构

**决策**: 使用扁平路由结构，三个主页面作为同级路由。

```
/           → 重定向到 /gifts
/gifts      → GiftRecordsView
/tips       → TipsView
/relatives  → RelativesView
```

**理由**:
- 三个功能地位平等，无层级关系
- URL简洁明了
- 便于导航栏激活状态匹配

### 3. 组件组织

**决策**: 在 `src/views/` 下创建三个文件夹，每个页面独立目录。

```
src/views/
├── GiftRecords/
│   └── index.vue
├── Tips/
│   └── index.vue
└── Relatives/
    └── index.vue
```

**理由**:
- 每个页面可能有独立的样式和组件
- 便于后续扩展页面功能
- 符合项目现有结构

### 4. 导航栏位置

**决策**: Tabbar 固定在页面底部，内容区域在上方。

**布局结构**:
```vue
<template>
  <div class="app">
    <div class="content">
      <router-view />
    </div>
    <van-tabbar>
      <!-- tab items -->
    </van-tabbar>
  </div>
</template>
```

**理由**:
- 符合移动端应用常见布局
- Tabbar 固定便于随时切换
- 内容区域自适应高度

### 5. 样式方案

**决策**: 使用 SCSS 组织样式，Vant 主题变量保持一致。

**样式要点**:
- Tabbar 使用默认主题色
- 页面内容区添加适当 padding
- 移动端安全区域适配（iPhone X+ 底部）

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Tabbar 在部分安卓机型显示异常 | 使用 Vant 的 `--van-tabbar-height` CSS 变量测试 |
| 路由切换闪烁 | 后续可添加 keep-alive 优化 |
| 图标不符合用户预期 | Vant 图标库有限，后续可自定义图标 |

## Migration Plan

1. 更新 App.vue 添加 Tabbar
2. 创建三个视图组件文件
3. 更新 router/index.ts 添加新路由
4. 测试导航功能和路由切换

## Open Questions

1. 是否需要登录后才能访问这些页面？
2. 是否需要页面切换动画？
3. 默认激活哪个标签？（当前设计：礼薄）
