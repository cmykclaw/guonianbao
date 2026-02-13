## 1. Install Dependencies

- [x] 1.1 Install jsonwebtoken, bcryptjs
- [x] 1.2 Install @types/jsonwebtoken, @types/bcryptjs

## 2. Database Schema

- [x] 2.1 Add User model to prisma/schema.prisma
- [x] 2.2 Add userId field to GiftRecord model
- [x] 2.3 Run prisma migrate

## 3. Auth Middleware

- [x] 3.1 Create middleware/auth.ts
- [x] 3.2 Implement JWT verification
- [x] 3.3 Attach userId to req.user

## 4. Auth Routes

- [x] 4.1 Create routes/auth.ts
- [x] 4.2 Implement register endpoint
- [x] 4.3 Implement login endpoint
- [x] 4.4 Mount routes in index.ts

## 5. Gift Routes with Auth

- [x] 5.1 Import auth middleware
- [x] 5.2 Apply middleware to all gift routes
- [x] 5.3 Update GET to filter by userId
- [x] 5.4 Update POST to include userId

## 6. Environment

- [x] 6.1 Add JWT_SECRET to .env

## 7. Testing

- [x] 7.1 Test registration
- [x] 7.2 Test login
- [x] 7.3 Test protected routes
- [x] 7.4 Verify build
