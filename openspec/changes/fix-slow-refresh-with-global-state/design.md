## Context

The GiftBookView component currently uses local state within `<script setup>`:
- `let lastFetchTime = 0` - timestamp of last API call
- `const records = ref<GiftRecordDTO[]>([])` - cached gift records

When users switch tabs, Vue destroys the component and creates a new one on return. This resets both variables, forcing a full API fetch every time.

## Goals / Non-Goals

**Goals:**
- Eliminate slow tab switches caused by redundant API calls
- Persist cache across component lifecycle
- Maintain backward compatibility with existing UI

**Non-Goals:**
- Implementing a full Vuex/Pinia store
- Modifying other components

## Decisions

1. **Use module-level global singleton in regular `<script>` block**
   - Rationale: Variables defined in a regular `<script>` block are not reactive by default but persist across component lifecycle. This is the simplest approach without adding state management libraries.
   - Alternative considered: Pinia store - overkill for this single component

2. **Two-parameter loadGifts function**
   - `force`: If true, bypass cache and fetch fresh data
   - `isSilent`: If true, suppress loading indicators (for background refresh on activate)
   - Rationale: Provides fine-grained control over refresh behavior

3. **Reuse global records in `<script setup>`**
   - `const records = globalRecords` for template compatibility
   - Rationale: Template binding still works with the same reference

## Risks / Trade- offs

- **Risk**: Memory leak if app runs for extended period - mitigated by data being replaced, not accumulated
- **Trade-off**: Data may be slightly stale on very long sessions - acceptable tradeoff for performance
