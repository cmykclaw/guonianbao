## ADDED Requirements

### Requirement: Gift records data isolation
The system SHALL ensure users can only access their own gift records.

#### Scenario: Get own records
- **WHEN** authenticated user calls GET /api/gifts
- **THEN** return only records where userId matches current user

#### Scenario: Create record for current user
- **WHEN** authenticated user calls POST /api/gifts
- **THEN** automatically set userId to current user's id

#### Scenario: Unauthenticated access
- **WHEN** unauthenticated user calls GET /api/gifts
- **THEN** return 401 Unauthorized
