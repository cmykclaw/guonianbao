## ADDED Requirements

### Requirement: Fuzzy search for relatives
The system SHALL allow users to fuzzy search relatives by relation description or title.

#### Scenario: Search by relation description
- **WHEN** user enters "爸爸的哥哥" in the search box
- **THEN** system SHALL display all relatives containing "爸爸的哥哥" in the relation field

#### Scenario: Search by title
- **WHEN** user enters "伯父" in the search box
- **THEN** system SHALL display all relatives containing "伯父" in the title field

#### Scenario: Partial match search
- **WHEN** user enters "哥哥" in the search box
- **THEN** system SHALL display all relatives containing "哥哥" in either relation or title

#### Scenario: Empty search results
- **WHEN** user enters a search term that matches no relatives
- **THEN** system SHALL display van-empty component with message "未找到相关亲戚关系"

### Requirement: Real-time search results
The system SHALL display search results in real-time as user types.

#### Scenario: Real-time update
- **WHEN** user types each character in the search box
- **THEN** system SHALL update the search results immediately without clicking submit

#### Scenario: Clear search
- **WHEN** user clears the search box
- **THEN** system SHALL hide search results and show the category quick lookup table
