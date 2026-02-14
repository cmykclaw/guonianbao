## Why

重构 RelativesView.vue 的亲戚关系数据和分类展示 UI，将原有的 tabs 切换改为折叠面板展示，并扩充更专业的亲戚关系数据，提升用户体验和实用性。

## What Changes

- 重构数据模型：使用新的 Relative 接口，包含 relation、title、category 字段
- 重构分类：将亲戚分为"堂表迷阵"、"长辈配偶"、"复杂晚辈"、"婚后专属"四类
- 重构 UI：将 van-tabs 替换为 van-collapse 折叠面板
- 新增计算属性：group1、group2、group3、group4 用于分类过滤
- 保留原有逻辑：顶部搜索框、isAILoading、AI 计算、watch 防抖等核心逻辑不变

## Capabilities

### New Capabilities
- `relatives-category-display`: 使用折叠面板分类展示亲戚关系

### Modified Capabilities
- (无)

## Impact

- 修改文件：`packages/frontend/src/views/RelativesView.vue`
- 受影响功能：亲戚关系展示页面
