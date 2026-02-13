## Why

需要将 TipsView.vue 升级为"静态预设 + AI 实时生成"的混合锦囊，让用户可以输入上下文生成定制化内容，同时保留静态数据作为兜底。

## What Changes

- 保留 van-tabs 分为"定制吉祥话"和"高情商防身"两个 Tab
- 每个 Tab 下增加 AI 交互区（输入框 + 按钮）
- 新增 isGenerating 状态和 aiResults 数组
- 调用后端 /api/tips/generate 接口获取 AI 生成内容
- 每条结果添加复制图标，点击复制并显示 toast
- 保留静态 Mock 数据，使用 van-collapse 折叠面板展示

## Capabilities

### New Capabilities
- `tips-ai-generation`: AI 锦囊生成前端集成

### Modified Capabilities
- （无，现有 Tips 页面无 AI 功能）

## Impact

- 修改 packages/frontend/src/views/TipsView.vue
- 调用后端 POST /api/tips/generate 接口
- 新增静态 Mock 数据
