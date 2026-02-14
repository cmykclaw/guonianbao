## 1. Implementation

- [x] 1.1 Add regular `<script>` block with global singleton variables (globalRecords, globalLastFetchTime)
- [x] 1.2 Modify `<script setup>` to use global variables instead of local ones
- [x] 1.3 Update loadGifts function to accept force and isSilent parameters
- [x] 1.4 Update onMounted and onActivated to call loadGifts(false, true)
- [x] 1.5 Update onSubmit to call loadGifts(true, false) after successful submission

## 2. Verification

- [ ] 2.1 Test: Navigate to Gifts tab - data loads
- [ ] 2.2 Test: Switch to another tab, then back to Gifts within 30s - instant load from cache
- [ ] 2.3 Test: Switch to another tab, then back to Gifts after 30s - data refreshes
- [ ] 2.4 Test: Add new record - list updates correctly
