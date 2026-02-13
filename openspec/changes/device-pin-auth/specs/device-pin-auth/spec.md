## ADDED Requirements

### Requirement: Check device registration
The system SHALL check if a device is registered.

#### Scenario: Device not registered
- **WHEN** client sends POST /api/auth/check-device with deviceId
- **AND** device not found
- **THEN** return { isRegistered: false }

#### Scenario: Device registered
- **WHEN** client sends with registered deviceId
- **THEN** return { isRegistered: true }

### Requirement: Register with PIN
The system SHALL register new device with PIN.

#### Scenario: Successful registration
- **WHEN** client sends POST /api/auth/register-pin with deviceId and pin
- **AND** pin is 4 digits
- **THEN** create user, encrypt PIN, return { token }

### Requirement: Verify PIN and login
The system SHALL verify PIN and issue token.

#### Scenario: Correct PIN
- **WHEN** client sends POST /api/auth/verify-pin with correct PIN
- **THEN** return { token }

#### Scenario: Wrong PIN
- **WHEN** client sends with wrong PIN
- **THEN** return 401 error
