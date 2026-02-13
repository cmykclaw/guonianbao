## ADDED Requirements

### Requirement: Phone number input with verification
The system SHALL provide phone number and verification code input.

#### Scenario: Valid phone number
- **WHEN** user enters phone number matching /^1[3-9]\d{9}$/
- **AND** clicks send code button
- **THEN** send request to backend

#### Scenario: Invalid phone number
- **WHEN** user enters invalid phone number
- **AND** clicks send code button
- **THEN** show toast "请输入正确的手机号"

### Requirement: Countdown timer
The system SHALL implement 60 second countdown after sending code.

#### Scenario: Countdown active
- **WHEN** user successfully sends verification code
- **THEN** button shows "60s 后重试"
- **AND** button is disabled
- **AND** countdown decreases every second

#### Scenario: Countdown ends
- **WHEN** countdown reaches 0
- **THEN** button shows "发送验证码"
- **AND** button is enabled

### Requirement: Login with verification code
The system SHALL login user with phone and code.

#### Scenario: Successful login
- **WHEN** user enters valid phone and code
- **AND** clicks login button
- **AND** backend returns success
- **THEN** save token to localStorage
- **AND** show success toast
- **AND** redirect to /gifts
