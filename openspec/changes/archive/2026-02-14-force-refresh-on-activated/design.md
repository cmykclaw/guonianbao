## Context

The GiftsView.vue component displays gift records and currently relies on `onMounted` for initial data loading and a route watcher for refresh. However, when the component is cached via Vue's `<keep-alive>` and users switch between tabs, the component isn't destroyed - it's just deactivated. When the user returns to the Gifts tab, the component is "activated" but `onMounted` doesn't fire again.

## Goals / Non-Goals

**Goals:**
- Fix refresh issue when switching back to Gifts tab from other tabs
- Maintain existing throttle mechanism to prevent excessive API calls
- Ensure backward compatibility

**Non-Goals:**
- Refactoring other components
- Adding new features to the gift view

## Decisions

1. **Use `onActivated` hook instead of route watch**
   - Rationale: `onActivated` fires every time a keep-alive cached component is activated, solving the tab-switch refresh issue
   - Alternative considered: Using `beforeRouteEnter` with `nextTick` - more complex and doesn't handle subsequent activations

2. **Keep `onMounted` for initial load**
   - Rationale: Provides fallback for first-time component mount and ensures compatibility with non-keep-alive scenarios

3. **Reuse existing `loadGifts` function**
   - Rationale: Already contains throttle logic (30 seconds), no need to duplicate

## Risks / Trade-offs

- **Risk**: None significant - this is a well-understood Vue lifecycle pattern
- **Trade-off**: Small increase in API calls when rapidly switching tabs (mitigated by existing throttle)
