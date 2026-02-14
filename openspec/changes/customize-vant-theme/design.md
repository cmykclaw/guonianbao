## Context

前端应用使用 Vant UI 组件库，当前使用默认主题色。需要定制为"过年红"主题色以提升节日氛围。

## Goals / Non-Goals

**Goals:**
- 通过 CSS 变量覆盖方式定制 Vant 主题色
- 覆盖全局主色调、导航栏、标签栏、按钮等常用组件

**Non-Goals:**
- 不修改 Vant 组件源码
- 不添加新的 UI 组件
- 不涉及后端 API 变更

## Decisions

1. **使用 CSS 变量覆盖而非定制主题构建**
   - Vant 支持通过 CSS 变量覆盖主题色，无需重新构建
   - 在全局样式中定义 `:root` 变量即可生效

2. **在 App.vue 中添加全局样式**
   - 项目已有不带 scoped 的 `<style lang="scss">` 块
   - 可直接添加 CSS 变量覆盖，无需创建新文件

## Risks / Trade-offs

- Vant 版本更新可能导致变量名变化 → 需关注 Vant 更新日志
