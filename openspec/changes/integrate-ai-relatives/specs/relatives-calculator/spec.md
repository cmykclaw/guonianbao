## MODIFIED Requirements

### Requirement: Three-stage calculation pipeline
The system SHALL implement a three-stage calculation pipeline for relative titles.

#### Scenario: Stage 1 - Local calculation succeeds
- **WHEN** user enters a relationship that can be calculated locally
- **THEN** the system SHALL use relationship.js or static JSON
- **AND** display the result immediately
- **AND** NOT call the AI API

#### Scenario: Stage 2 - AI calculation fallback
- **WHEN** local calculation returns empty
- **AND** the relationship contains "的"
- **THEN** the system SHALL call the AI API
- **AND** display the AI result

#### Scenario: Stage 3 - Fallback UI
- **WHEN** both local and AI calculation fail
- **THEN** the system SHALL display van-empty with humorous message

### Requirement: Clean input before API call
The system SHALL clean input before sending to AI API.

#### Scenario: Clean input sent to API
- **WHEN** the system calls AI API
- **THEN** the cleaned (trimmed, trailing "的" removed) relation string SHALL be sent
