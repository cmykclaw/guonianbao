## Why

为 frontend 应用定制喜庆的"过年红"主题色，替换 Vant UI 的默认主题色为象征中国传统节日的红色 (#ee0a24)，提升应用的节日氛围和用户体验。

## What Changes

- 修改 `packages/frontend/src/App.vue` 的全局样式
- 在 `:root` 选择器中添加 Vant CSS 变量覆盖
- 定制全局主色调、导航栏、标签栏、按钮等组件的主题色

## Capabilities

### New Capabilities
- `vant-theme-customization`: Vant UI 组件库的全局主题色定制

### Modified Capabilities
- (无)

## Impact

- 修改文件：`packages/frontend/src/App.vue`
- 受影响组件：van-nav-bar, van-tabbar, van-button 等 Vant 组件
