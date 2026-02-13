## ADDED Requirements

### Requirement: Dynamic relationship calculation
The system SHALL calculate complex relative relationships using relationship.js library.

#### Scenario: Calculate simple relationship
- **WHEN** user enters "妈妈的兄弟" in search box
- **THEN** system SHALL call relationship.js and display the calculated result (e.g., "舅舅")

#### Scenario: Calculate complex relationship
- **WHEN** user enters "妈妈的姐妹的儿子" in search box
- **THEN** system SHALL call relationship.js and display the calculated result (e.g., "表哥 / 表弟")

#### Scenario: Multiple calculation results
- **WHEN** user enters a relationship that has multiple possible titles
- **THEN** system SHALL display all possible titles separated by " / "

### Requirement: Handle calculation failure
The system SHALL handle cases where relationship.js cannot calculate the relationship.

#### Scenario: Uncalculable relationship
- **WHEN** user enters an overly complex or invalid relationship text
- **AND** relationship.js returns empty or null result
- **THEN** system SHALL display van-empty component with message "关系太复杂，算不出来啦"

### Requirement: Search vs calculation priority
The system SHALL prioritize static data search over dynamic calculation when both could match.

#### Scenario: Static data match first
- **WHEN** user enters a search term that matches static data
- **THEN** system SHALL display static data results instead of calling relationship.js
