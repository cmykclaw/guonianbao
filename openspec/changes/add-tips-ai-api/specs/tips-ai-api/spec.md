## ADDED Requirements

### Requirement: POST /api/tips/generate endpoint
The system SHALL provide an endpoint to generate tips using AI.

#### Scenario: Generate greeting
- **WHEN** client sends POST with { "type": "greeting", "context": "用户特征" }
- **AND** AI returns valid JSON array
- **THEN** return { "results": ["祝福1", "祝福2", "祝福3"] }

#### Scenario: Generate comeback
- **WHEN** client sends POST with { "type": "comeback", "context": "被问的问题" }
- **AND** AI returns valid JSON array
- **THEN** return { "results": ["回复1", "回复2", "回复3"] }

#### Scenario: Invalid type
- **WHEN** client sends with invalid type
- **THEN** return 400 error with message "type must be greeting or comeback"

#### Scenario: Missing context
- **WHEN** client sends without context
- **THEN** return 400 error with message "context is required"

#### Scenario: AI returns non-JSON
- **WHEN** AI response cannot be parsed as JSON
- **THEN** return the raw text as single element array
