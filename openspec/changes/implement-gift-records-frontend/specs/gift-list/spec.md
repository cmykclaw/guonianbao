# Spec: gift-list

## ADDED Requirements

### Requirement: 记录列表展示
必须展示礼薄记录列表。

#### Scenario: 列表渲染
- **WHEN** 页面加载完成
- **THEN** 必须显示记录列表
- **AND** 必须使用 van-list 组件
- **AND** 每条记录必须使用 van-cell 组件

#### Scenario: 列表项内容
- **WHEN** 查看列表项
- **THEN** 必须显示人名
- **AND** 必须显示日期
- **AND** 必须显示金额
- **AND** 可选显示备注

#### Scenario: 金额颜色显示
- **WHEN** 记录类型为 RECEIVED（收礼）
- **THEN** 金额必须以红色显示
- **AND** 金额前缀必须显示"+"
- **AND** 格式为"+¥1,000"

#### Scenario: 送礼金额显示
- **WHEN** 记录类型为 GIVEN（送礼）
- **THEN** 金额必须以绿色显示
- **AND** 金额前缀必须显示"-"
- **AND** 格式为"-¥500"

#### Scenario: 空列表状态
- **WHEN** 没有任何记录
- **THEN** 必须显示空状态提示
- **AND** 提示文字必须为"暂无记录"
- **AND** 可以使用 van-empty 组件

### Requirement: 列表排序
记录必须按日期倒序排列。

#### Scenario: 排序验证
- **WHEN** 有多条记录
- **THEN** 最新的记录必须显示在列表顶部
- **AND** 最旧的记录必须显示在列表底部
