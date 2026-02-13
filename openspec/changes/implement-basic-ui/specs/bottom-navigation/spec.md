# Spec: bottom-navigation

## ADDED Requirements

### Requirement: Tabbar 组件集成
底部导航栏必须使用 Vant UI 的 Tabbar 和 TabbarItem 组件实现。

#### Scenario: 组件正确渲染
- **WHEN** 用户打开应用
- **THEN** 页面底部必须显示 Vant Tabbar 组件
- **AND** Tabbar 必须包含三个 TabbarItem

### Requirement: 导航项配置
底部导航必须包含三个功能入口，分别对应不同的页面和图标。

#### Scenario: 礼薄导航项
- **WHEN** 查看底部导航栏
- **THEN** 第一个 TabbarItem 必须显示文本"礼薄"
- **AND** 必须使用 `records` 图标
- **AND** 点击后必须导航到 `/gifts` 路由

#### Scenario: 锦囊导航项
- **WHEN** 查看底部导航栏
- **THEN** 第二个 TabbarItem 必须显示文本"锦囊"
- **AND** 必须使用 `guide-o` 图标
- **AND** 点击后必须导航到 `/tips` 路由

#### Scenario: 亲戚导航项
- **WHEN** 查看底部导航栏
- **THEN** 第三个 TabbarItem 必须显示文本"亲戚"
- **AND** 必须使用 `friends-o` 图标
- **AND** 点击后必须导航到 `/relatives` 路由

### Requirement: 激活状态管理
当前激活的导航项必须高亮显示，与当前路由匹配。

#### Scenario: 默认激活状态
- **WHEN** 应用首次加载
- **THEN** "礼薄" TabbarItem 必须处于激活状态

#### Scenario: 路由切换时更新
- **WHEN** 用户点击不同的 TabbarItem
- **THEN** 对应项必须变为激活状态
- **AND** 之前激活的项必须变为非激活状态
