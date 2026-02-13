## 1. Environment Setup

- [x] 1.1 Install openai and dotenv dependencies in backend
- [x] 1.2 Create .env file with ZHIPU_API_KEY
- [x] 1.3 Configure dotenv in backend entry file

## 2. AI Client Setup

- [x] 2.1 Import OpenAI SDK
- [x] 2.2 Initialize OpenAI client with Zhipu API credentials
- [x] 2.3 Configure baseURL to "https://open.bigmodel.cn/api/paas/v4/"

## 3. API Endpoint Implementation

- [x] 3.1 Create POST /api/relatives/calculate endpoint
- [x] 3.2 Add request body validation
- [x] 3.3 Implement AI prompt (system message)
- [x] 3.4 Call client.chat.completions.create with model glm-4-flash
- [x] 3.5 Extract and return the AI response
- [x] 3.6 Add error handling (try-catch)

## 4. Testing

- [x] 4.1 Test successful calculation
- [x] 4.2 Test invalid request
- [x] 4.3 Test AI API failure handling
- [x] 4.4 Verify build succeeds
