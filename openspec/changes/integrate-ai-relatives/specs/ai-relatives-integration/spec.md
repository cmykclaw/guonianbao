## ADDED Requirements

### Requirement: Debounce input handling
The system SHALL implement debounce logic to avoid frequent calculations.

#### Scenario: Debounce triggers after 500ms
- **WHEN** user types in van-search
- **THEN** the system SHALL wait 500ms after user stops typing
- **AND** only then trigger the calculation logic

#### Scenario: Immediate trigger on clear
- **WHEN** user clears the search input
- **THEN** the system SHALL immediately clear results without waiting

### Requirement: Input string cleaning
The system SHALL clean the input string before calculation.

#### Scenario: Trim whitespace
- **WHEN** user enters "  老婆的弟弟  "
- **THEN** the system SHALL trim to "老婆的弟弟"

#### Scenario: Remove trailing "的"
- **WHEN** user enters "老婆的爷爷的"
- **THEN** the system SHALL clean to "老婆的爷爷"

#### Scenario: Empty after cleaning
- **WHEN** user enters only spaces or "的"
- **THEN** the system SHALL return empty and not trigger calculation

### Requirement: AI loading state
The system SHALL display loading state during AI calculation.

#### Scenario: Show loading during AI call
- **WHEN** local calculation fails and AI API is called
- **THEN** isAILoading SHALL be set to true
- **AND** van-loading component SHALL be displayed with text "关系太复杂，AI 正在飞速烧脑中..."

#### Scenario: Hide loading after AI response
- **WHEN** AI API returns successfully
- **THEN** isAILoading SHALL be set to false
- **AND** loading component SHALL be hidden

### Requirement: Error handling with fallback UI
The system SHALL handle API errors gracefully.

#### Scenario: Network error
- **WHEN** AI API request fails
- **THEN** the system SHALL catch the error
- **AND** display van-empty with message "网络开小差了，不如直接叫帅哥美女吧！"
