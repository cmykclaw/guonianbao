## 1. Input Handling

- [x] 1.1 Create useDebounceFn composable (500ms delay)
- [x] 1.2 Implement input cleaning function (trim, remove trailing "的")
- [x] 1.3 Handle empty input case

## 2. State Management

- [x] 2.1 Add isAILoading reactive ref (initial: false)
- [x] 2.2 Add computed property for debounced search text

## 3. Three-Stage Calculation

- [x] 3.1 Implement Stage 1: local calculation (relationship.js)
- [x] 3.2 Implement Stage 2: AI API call fallback
- [x] 3.3 Implement Stage 3: error fallback UI
- [x] 3.4 Connect debounce to calculation trigger

## 4. UI Updates

- [x] 4.1 Add van-loading component with message
- [x] 4.2 Update error message to "网络开小差了，不如直接叫帅哥美女吧！"
- [x] 4.3 Update template to show loading state

## 5. Testing & Verification

- [x] 5.1 Test debounce (typing, waiting)
- [x] 5.2 Test local calculation
- [x] 5.3 Test AI fallback
- [x] 5.4 Test error handling
- [x] 5.5 Verify build succeeds
