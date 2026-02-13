## ADDED Requirements

### Requirement: Zhipu AI client initialization
The system SHALL initialize the OpenAI client with Zhipu API credentials.

#### Scenario: Client initialization
- **WHEN** the backend server starts
- **THEN** the OpenAI client SHALL be configured with:
- apiKey from process.env.ZHIPU_API_KEY
- baseURL set to "https://open.bigmodel.cn/api/paas/v4/"

### Requirement: POST /api/relatives/calculate endpoint
The system SHALL provide a POST endpoint to calculate relative titles using Zhipu AI.

#### Scenario: Successful calculation
- **WHEN** client sends POST request to /api/relatives/calculate with { "relation": "老婆的弟弟" }
- **AND** the Zhipu API returns a valid response
- **THEN** the system SHALL return { "title": "小舅子" } with status 200

#### Scenario: Invalid request body
- **WHEN** client sends POST request without "relation" field
- **THEN** the system SHALL return 400 error with message "relation is required"

#### Scenario: AI API failure
- **WHEN** the Zhipu API call fails
- **THEN** the system SHALL return 500 error with message "AI calculation failed"

#### Scenario: Empty relation input
- **WHEN** client sends { "relation": "" }
- **THEN** the system SHALL return 400 error with message "relation cannot be empty"

### Requirement: AI prompt configuration
The system SHALL use a predefined system message for the AI model.

#### Scenario: System message content
- **WHEN** the AI model is called
- **THEN** the system message SHALL instruct the model to:
- Act as a Chinese relative title expert
- Only output the title itself
- No punctuation, no explanation, no extra text
- Return generic terms like "表亲" for complex relationships
