## ADDED Requirements

### Requirement: Global singleton cache for gift records
The system SHALL maintain gift records in a global singleton that persists across component lifecycle.

#### Scenario: First page load
- **WHEN** user navigates to Gifts tab for the first time
- **THEN** the gift list loads via API and is stored in global cache

#### Scenario: Returning from another tab within 30 seconds
- **WHEN** user switches to another tab and returns to Gifts within 30 seconds
- **THEN** the cached data is displayed immediately without API call

#### Scenario: Returning from another tab after 30 seconds
- **WHEN** user switches to another tab and returns to Gifts after 30 seconds
- **THEN** the gift list refreshes via API and updates global cache

#### Scenario: Manual refresh
- **WHEN** user pulls to refresh the gift list
- **THEN** the API is called regardless of cache status, and global cache is updated

#### Scenario: Adding new record
- **WHEN** user successfully adds a new gift record
- **THEN** the list refreshes via API to show the new record
