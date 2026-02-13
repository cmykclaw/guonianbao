## ADDED Requirements

### Requirement: User registration
The system SHALL allow users to register with username and password.

#### Scenario: Successful registration
- **WHEN** client sends POST /api/auth/register with { username, password }
- **AND** username is not taken
- **THEN** create new user with encrypted password
- **AND** return { message: "注册成功" }

#### Scenario: Username taken
- **WHEN** client sends POST with existing username
- **THEN** return 400 error

### Requirement: User login
The system SHALL authenticate users and issue JWT token.

#### Scenario: Successful login
- **WHEN** client sends POST /api/auth/login with correct username and password
- **THEN** return { token, username }

#### Scenario: Invalid credentials
- **WHEN** client sends wrong username or password
- **THEN** return 401 error

### Requirement: JWT authentication middleware
The system SHALL verify JWT tokens on protected routes.

#### Scenario: Valid token
- **WHEN** request has valid Authorization: Bearer <token>
- **THEN** attach userId to req.user
- **AND** proceed to next handler

#### Scenario: Invalid or missing token
- **WHEN** request has invalid or missing token
- **THEN** return 401 Unauthorized
