## 1. Implementation

- [x] 1.1 Import onActivated from Vue in GiftsView.vue
- [x] 1.2 Add onActivated hook that calls loadGifts()
- [x] 1.3 Remove existing route watch logic (if any)
- [x] 1.4 Verify onMounted still has initial load for fallback

## 2. Verification

- [ ] 2.1 Test: Navigate to Gifts tab - data loads
- [ ] 2.2 Test: Switch to another tab, then back to Gifts - data refreshes
- [ ] 2.3 Test: Rapid tab switching - throttle prevents excessive requests
