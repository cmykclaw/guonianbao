## 1. Setup

- [x] 1.1 Install relationship.js library in frontend package
- [x] 1.2 Verify dependency installation in package.json

## 2. Data Layer

- [x] 2.1 Create relativesData array with 20+ common Chinese relatives
- [x] 2.2 Ensure data covers all three categories (父族, 母族, 伴侣族)
- [x] 2.3 Export data as reactive ref for Vue component

## 3. UI Components

- [x] 3.1 Create RelativesView.vue file structure
- [x] 3.2 Implement van-search component with placeholder "输入关系，如：老婆的弟弟"
- [x] 3.3 Implement van-tabs with three tabs: 爸爸这边的, 妈妈这边的, 伴侣这边的
- [x] 3.4 Implement van-grid/van-cell for category quick lookup display

## 4. Search Functionality

- [x] 4.1 Implement fuzzy search computed property
- [x] 4.2 Search both relation and title fields
- [x] 4.3 Toggle between search results and category table based on input
- [x] 4.4 Display van-empty when no search results

## 5. Calculator Integration

- [x] 5.1 Import and initialize relationship.js
- [x] 5.2 Call relationship.js when search input doesn't match static data
- [x] 5.3 Display calculated results using van-cell-group
- [x] 5.4 Handle empty/null results with van-empty message "关系太复杂，算不出来啦"

## 6. Styling

- [x] 6.1 Style title with bold or red color
- [x] 6.2 Ensure mobile-friendly layout
- [x] 6.3 Verify festive and clean appearance

## 7. Integration

- [x] 7.1 Update router to use RelativesView component
- [x] 7.2 Test the complete flow
- [x] 7.3 Fix any TypeScript errors
