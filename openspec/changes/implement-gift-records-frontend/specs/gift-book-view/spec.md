# Spec: gift-book-view

## ADDED Requirements

### Requirement: 页面组件存在
必须创建礼薄页面组件文件。

#### Scenario: 组件文件存在
- **WHEN** 查看 `frontend/src/views/GiftBookView.vue`
- **THEN** 文件必须存在
- **AND** 必须是一个有效的 Vue 单文件组件

#### Scenario: 页面可访问
- **WHEN** 用户导航到礼薄页面
- **THEN** 页面必须正确渲染
- **AND** 必须显示导航栏标题"礼薄"

### Requirement: 页面布局结构
页面必须包含统计区域、列表区域和悬浮按钮。

#### Scenario: 布局完整性
- **WHEN** 查看页面结构
- **THEN** 必须包含统计卡片区域
- **AND** 必须包含记录列表区域
- **AND** 必须包含右下角悬浮按钮

### Requirement: 响应式设计
页面必须在移动端正确显示。

#### Scenario: 移动端适配
- **WHEN** 在移动设备宽度下查看页面
- **THEN** 所有元素必须正确布局
- **AND** 文字大小必须合适阅读
