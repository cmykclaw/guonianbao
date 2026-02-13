## ADDED Requirements

### Requirement: Device ID management
The system SHALL manage device ID.

#### Scenario: New device
- **WHEN** page loads and no deviceId in localStorage
- **THEN** generate UUID and save to localStorage

#### Scenario: Existing device
- **WHEN** page loads and deviceId exists
- **THEN** use existing deviceId

### Requirement: Check registration status
The system SHALL check if device is registered.

#### Scenario: Check on load
- **WHEN** page loads with deviceId
- **THEN** call POST /api/auth/check-device
- **AND** set isRegistered accordingly

### Requirement: PIN input UI
The system SHALL use Vant password input.

#### Scenario: Show title based on status
- **WHEN** isRegistered is false
- **THEN** show "初次使用，请设置 4 位安全码"
- **AND** when isRegistered is true
- **THEN** show "请输入 4 位安全码"

### Requirement: Auto submit on 4 digits
The system SHALL auto submit when PIN is complete.

#### Scenario: Register new PIN
- **WHEN** user enters 4 digits and isRegistered is false
- **THEN** call POST /api/auth/register-pin

#### Scenario: Verify PIN
- **WHEN** user enters 4 digits and isRegistered is true
- **THEN** call POST /api/auth/verify-pin
