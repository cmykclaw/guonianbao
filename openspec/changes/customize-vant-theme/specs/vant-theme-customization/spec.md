## ADDED Requirements

### Requirement: Vant 全局主题色为过年红
系统 SHALL 使用 CSS 变量覆盖方式，将 Vant UI 的全局主色调设置为喜庆的中国红 (#ee0a24)。

#### Scenario: 全局主色调生效
- **WHEN** 前端页面加载
- **THEN** Vant 组件的默认主题色显示为 #ee0a24

### Requirement: 导航栏为红底白字
系统 SHALL 将顶部导航栏的背景色设为红色，文字和图标设为白色。

#### Scenario: 导航栏样式生效
- **WHEN** 页面包含 van-nav-bar 组件
- **THEN** 背景色显示为 #ee0a24，文字和图标显示为 #ffffff

### Requirement: 底部标签栏选中态为红色
系统 SHALL 将底部标签栏的选中颜色设置为中国红。

#### Scenario: 标签栏选中态样式生效
- **WHEN** 用户选中底部标签栏项目
- **THEN** 选中项的图标和文字颜色显示为 #ee0a24

### Requirement: 主要按钮为红色
系统 SHALL 将主要按钮的背景色和边框色设置为中国红。

#### Scenario: 按钮样式生效
- **WHEN** 页面渲染 van-button 组件 (type="primary")
- **THEN** 按钮背景色和边框色显示为 #ee0a24
