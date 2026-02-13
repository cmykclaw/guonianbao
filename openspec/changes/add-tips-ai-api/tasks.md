## 1. Route Implementation

- [x] 1.1 Create tips.routes.ts file
- [x] 1.2 Implement POST /generate endpoint
- [x] 1.3 Add request validation (type, context)
- [x] 1.4 Define system prompts for greeting and comeback

## 2. AI Integration

- [x] 2.1 Import existing OpenAI client setup
- [x] 2.2 Call client.chat.completions.create with model glm-4-flash
- [x] 2.3 Parse AI response as JSON
- [x] 2.4 Handle parse failure gracefully

## 3. Response Handling

- [x] 3.1 Return { results: [...] } on success
- [x] 3.2 Return 400 on validation error
- [x] 3.3 Return 500 on AI error

## 4. Route Registration

- [x] 4.1 Import tips routes in index.ts
- [x] 4.2 Mount at /tips

## 5. Testing

- [x] 5.1 Test greeting generation
- [x] 5.2 Test comeback generation
- [x] 5.3 Test invalid request
- [x] 5.4 Verify build succeeds
