## ADDED Requirements

### Requirement: Refresh gift list on component activation
The system SHALL refresh the gift list data when the GiftsView component is activated from keep-alive cache.

#### Scenario: Initial page load
- **WHEN** user navigates to Gifts tab for the first time
- **THEN** the gift list loads via onMounted hook

#### Scenario: Returning from another tab
- **WHEN** user switches from another tab back to the Gifts tab (where GiftsView is cached)
- **THEN** the gift list refreshes via onActivated hook

#### Scenario: Rapid tab switching
- **WHEN** user rapidly switches between tabs multiple times within 30 seconds
- **THEN** the gift list refreshes at most once due to the existing throttle mechanism

#### Scenario: Manual refresh
- **WHEN** user manually triggers a refresh (e.g., pull-to-refresh gesture)
- **THEN** the gift list refreshes immediately, resetting the throttle timer
