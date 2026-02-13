## ADDED Requirements

### Requirement: Static relatives data structure
The system SHALL maintain a reactive JSON array containing at least 20 common Chinese relatives.

#### Scenario: Data structure
- **WHEN** the RelativesView component loads
- **THEN** system SHALL initialize relativesData array with objects containing:
- relation: string (relationship description)
- title: string (corresponding title)
- category: string ("父族" | "母族" | "伴侣族")

#### Scenario: Minimum data count
- **WHEN** the RelativesView component loads
- **THEN** system SHALL have at least 20 relatives in the initial data

### Requirement: Data category coverage
The system SHALL ensure all three categories are represented in the initial data.

#### Scenario: Father side coverage
- **WHEN** the RelativesView component loads
- **THEN** system SHALL have at least 5 relatives with category "父族"

#### Scenario: Mother side coverage
- **WHEN** the RelativesView component loads
- **THEN** system SHALL have at least 5 relatives with category "母族"

#### Scenario: Spouse side coverage
- **WHEN** the RelativesView component loads
- **THEN** system SHALL have at least 5 relatives with category "伴侣族"

### Requirement: Data initialization
The system SHALL initialize the data with common Chinese Spring Festival relatives.

#### Scenario: Common relatives included
- **WHEN** the RelativesView component loads
- **THEN** system SHALL include common relatives such as:
- 爸爸的哥哥 (伯父/大爷), 爸爸的弟弟 (叔叔), 妈妈的哥哥 (舅舅), etc.
