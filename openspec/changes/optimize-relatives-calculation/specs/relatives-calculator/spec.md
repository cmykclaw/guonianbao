## MODIFIED Requirements

### Requirement: Dynamic relationship calculation with chain reduction
The system SHALL calculate complex relative relationships using both direct calculation and chain reduction algorithm.

#### Scenario: Direct calculation succeeds
- **WHEN** user enters a relationship that relationship.js can calculate directly
- **THEN** system SHALL display the calculated result

#### Scenario: Direct calculation fails, use chain reduction
- **WHEN** user enters "老婆的爷爷的堂姐的外孙女"
- **AND** direct relationship({ text: input }) returns empty
- **THEN** system SHALL call calculateComplexRelation(input) 
- **AND** display the result if chain reduction succeeds

#### Scenario: Chain reduction also fails
- **WHEN** both direct calculation and chain reduction return empty
- **THEN** system SHALL display van-empty with message "哎呀，这关系跨度太大了，CPU烧了！不如直接叫帅哥/美女吧！"

### Requirement: Search integration with fallback
The system SHALL try multiple strategies in order when calculating relationships.

#### Scenario: Search triggers calculation
- **WHEN** user types in van-search
- **AND** search text does not match static data
- **THEN** system SHALL attempt direct calculation first
- **AND** if that fails, attempt chain reduction
- **AND** if that fails, show empty state
