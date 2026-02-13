## ADDED Requirements

### Requirement: AI generation UI
The system SHALL provide AI generation UI in each tab.

#### Scenario: Greeting tab input
- **WHEN** user is on "定制吉祥话" tab
- **THEN** show van-field with placeholder "你想给谁拜年？有什么特征？(例如：爱炒股的二舅)"
- **AND** show van-button with text "✨ AI 定制"

#### Scenario: Comeback tab input
- **WHEN** user is on "高情商防身" tab
- **THEN** show van-field with placeholder "亲戚刚才问了啥尴尬问题？"
- **AND** show van-button with text "🆘 呼叫军师"

### Requirement: AI API integration
The system SHALL call backend API to generate AI content.

#### Scenario: Generate greeting
- **WHEN** user clicks "✨ AI 定制" button
- **AND** enters context
- **THEN** call POST /api/tips/generate with { type: "greeting", context: "用户输入" }
- **AND** display loading state

#### Scenario: Generate comeback
- **WHEN** user clicks "🆘 呼叫军师" button
- **AND** enters context
- **THEN** call POST /api/tips/generate with { type: "comeback", context: "用户输入" }

### Requirement: Copy functionality
The system SHALL allow users to copy generated results.

#### Scenario: Copy result
- **WHEN** user clicks copy icon on a result
- **THEN** copy text to clipboard using navigator.clipboard.writeText
- **AND** show toast "复制成功"

### Requirement: Static fallback data
The system SHALL display static data as fallback.

#### Scenario: Display static data
- **WHEN** AI results are displayed
- **AND** user scrolls below
- **THEN** show "常用经典语录" section with van-collapse
- **AND** display static mock data
