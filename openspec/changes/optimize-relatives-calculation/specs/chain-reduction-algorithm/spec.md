## ADDED Requirements

### Requirement: Chain reduction algorithm
The system SHALL implement a chain reduction algorithm to calculate complex relative relationships by breaking them down into simpler steps.

#### Scenario: Calculate simple chain
- **WHEN** user enters "老婆的弟弟" 
- **AND** system calls calculateComplexRelation("老婆的弟弟")
- **THEN** system SHALL return ["小舅子"]

#### Scenario: Calculate medium chain
- **WHEN** user enters "老婆的爷爷" 
- **AND** system calls calculateComplexRelation("老婆的爷爷")
- **THEN** system SHALL return the calculated result from relationship.js

#### Scenario: Calculate long chain with reduction
- **WHEN** user enters "老婆的爷爷的堂姐"
- **AND** system calls calculateComplexRelation("老婆的爷爷的堂姐")
- **THEN** system SHALL split by "的" into ["老婆", "爷爷", "堂姐"]
- **AND** iterate: "老婆" → "老婆的爷爷" → "老婆的爷爷的堂姐"
- **AND** return the final calculated result

#### Scenario: Chain breaks returns empty
- **WHEN** user enters an unresolvable chain
- **AND** at some iteration relationship.js returns empty
- **THEN** system SHALL break the loop and return empty array

#### Scenario: Handle empty input
- **WHEN** user enters empty string or only whitespace
- **THEN** system SHALL return empty array

#### Scenario: Handle single entity
- **WHEN** user enters "爸爸" (no "的")
- **THEN** system SHALL call relationship.js directly and return result
