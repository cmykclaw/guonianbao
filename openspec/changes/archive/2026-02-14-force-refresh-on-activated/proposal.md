## Why

GiftsView.vue currently uses `watch` on route changes to refresh data, but this doesn't work when users switch between tabs in a keep-alive context. When users navigate away from the Gifts tab and return, the component is re-used (not re-mounted), so `onMounted` doesn't fire again. Using Vue's `onActivated` lifecycle hook solves this issue by triggering a refresh whenever the component is activated from the cached state.

## What Changes

- Replace route watch logic with `onActivated` hook in GiftsView.vue
- Keep `onMounted` for initial load as fallback
- Retain the existing 30-second throttle logic in `loadGifts` to prevent excessive API calls
- No breaking changes

## Capabilities

### New Capabilities
- `gifts-refresh-on-activate`: Refresh gift list data when component is activated from keep-alive cache

### Modified Capabilities
- None (this is a bug fix, not a requirement change)

## Impact

- **Code**: `packages/frontend/src/views/GiftsView.vue`
- **Dependencies**: Vue 3 (onActivated hook)
- **Systems**: Frontend gift records display
