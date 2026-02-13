## ADDED Requirements

### Requirement: Category quick lookup tabs
The system SHALL display three category tabs for quick lookup: "爸爸这边的", "妈妈这边的", "伴侣这边的".

#### Scenario: Display father side tab
- **WHEN** user opens the RelativesView page
- **THEN** system SHALL show a tab labeled "爸爸这边的" containing all father-side relatives

#### Scenario: Display mother side tab
- **WHEN** user clicks on "妈妈这边的" tab
- **THEN** system SHALL display all mother-side relatives

#### Scenario: Display spouse side tab
- **WHEN** user clicks on "伴侣这边的" tab
- **THEN** system SHALL display all spouse-side relatives

### Requirement: Category data display
The system SHALL display relatives data in each category using grid or cell layout.

#### Scenario: Display relative card
- **WHEN** user is on any category tab
- **THEN** system SHALL display each relative with relation description and title
- **AND** the title SHALL be bold or highlighted in red color

### Requirement: Default category selection
The system SHALL default to the "爸爸这边的" tab when page loads.

#### Scenario: Initial load
- **WHEN** user navigates to RelativesView for the first time
- **THEN** system SHALL automatically select and display the "爸爸这边的" tab
