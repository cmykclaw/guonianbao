## Why

When switching between tabs in the Vue app, the GiftBookView component is being destroyed and recreated, causing local cache variables (`lastFetchTime` and `records`) to be lost. This results in slow page transitions because the app must re-fetch data from the API every time the component mounts, even if the data was recently loaded. Moving these variables to a global singleton ensures data persists across component lifecycle.

## What Changes

- Add a regular `<script>` block above `<script setup>` to hold global singleton state
- Create `globalRecords` and `globalLastFetchTime` as module-level variables
- Modify `loadGifts` to use global variables for cache checking
- Update `onMounted` and `onActivated` to call `loadGifts(false, true)` (silent load)
- Update `onSubmit` to call `loadGifts(true, false)` (force refresh)
- No breaking changes

## Capabilities

### New Capabilities
- `global-gift-cache`: Global singleton cache for gift records to persist across component lifecycle

### Modified Capabilities
- None (this is a performance optimization, not a requirement change)

## Impact

- **Code**: `guonianbao/frontend/src/views/GiftBookView.vue`
- **Dependencies**: Vue 3
- **Systems**: Frontend gift records display
