# Spec: gift-form-modal

## ADDED Requirements

### Requirement: 悬浮按钮存在
页面必须有悬浮的新增按钮。

#### Scenario: 按钮渲染
- **WHEN** 查看页面
- **THEN** 右下角必须显示悬浮按钮
- **AND** 按钮必须为圆形
- **AND** 按钮必须包含"+"图标

#### Scenario: 按钮点击
- **WHEN** 点击悬浮按钮
- **THEN** 必须弹出底部弹窗
- **AND** 弹窗必须从底部滑入

### Requirement: 表单弹窗内容
弹窗内必须包含完整的表单。

#### Scenario: 表单字段
- **WHEN** 弹窗打开
- **THEN** 必须包含姓名输入框
- **AND** 必须包含类型选择（收礼/送礼）
- **AND** 必须包含金额输入框
- **AND** 必须包含备注输入框（可选）

#### Scenario: 姓名输入
- **WHEN** 查看姓名输入框
- **THEN** 必须使用 van-field 组件
- **AND** 标签必须为"姓名"
- **AND** 必须为必填项

#### Scenario: 类型选择
- **WHEN** 查看类型选择
- **THEN** 必须使用 van-radio-group 或类似组件
- **AND** 必须有两个选项："收礼"和"送礼"
- **AND** 默认必须选中"收礼"

#### Scenario: 金额输入
- **WHEN** 查看金额输入框
- **THEN** 必须使用 van-field 组件
- **AND** 类型必须为 number
- **AND** 标签必须为"金额"
- **AND** 必须为必填项

#### Scenario: 备注输入
- **WHEN** 查看备注输入框
- **THEN** 必须使用 van-field 组件
- **AND** 类型必须为 textarea
- **AND** 标签必须为"备注"
- **AND** 必须为可选项

#### Scenario: 提交按钮
- **WHEN** 查看表单底部
- **THEN** 必须显示提交按钮
- **AND** 按钮文字必须为"保存"
- **AND** 按钮类型必须为 primary

### Requirement: 表单提交
提交表单必须调用后端 API。

#### Scenario: 表单验证
- **WHEN** 提交时必填字段为空
- **THEN** 必须显示验证错误提示
- **AND** 必须阻止提交

#### Scenario: 成功提交
- **WHEN** 表单填写完整并提交
- **THEN** 必须调用 POST /api/gifts
- **AND** 必须显示成功提示
- **AND** 弹窗必须关闭
- **AND** 列表必须刷新
