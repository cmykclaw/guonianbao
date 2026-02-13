# Tasks: 礼薄功能后端实现

## 1. 更新共享类型

- [x] 1.1 在 `shared/src/types/index.ts` 中添加 GiftRecordDTO 接口
- [x] 1.2 在 `shared/src/types/index.ts` 中添加 CreateGiftRecordRequest 接口
- [x] 1.3 运行 `cd shared && npm run build` 编译共享类型

## 2. 数据库模型和迁移

- [x] 2.1 修改 `backend/prisma/schema.prisma`，添加 GiftRecord 模型
- [x] 2.2 运行 `cd backend && npx prisma migrate dev --name add_gift_record` 创建迁移
- [x] 2.3 运行 `npx prisma generate` 生成 Prisma Client

## 3. 服务层实现

- [x] 3.1 创建 `backend/src/services/gift.service.ts` 文件
- [x] 3.2 实现 `getAllGifts()` 方法，返回所有记录（按日期倒序）
- [x] 3.3 实现 `createGift(data)` 方法，创建新记录
- [x] 3.4 添加适当的错误处理

## 4. 控制器层实现

- [x] 4.1 创建 `backend/src/controllers/gift.controller.ts` 文件
- [x] 4.2 实现 `getGifts` 处理函数，调用 service 获取所有记录
- [x] 4.3 实现 `createGift` 处理函数，调用 service 创建记录
- [x] 4.4 添加请求体验证（检查必填字段）
- [x] 4.5 返回统一格式的 API 响应

## 5. 路由配置

- [x] 5.1 创建 `backend/src/routes/gift.routes.ts` 文件
- [x] 5.2 配置 GET / 路由指向 getGifts 控制器
- [x] 5.3 配置 POST / 路由指向 createGift 控制器
- [x] 5.4 更新 `backend/src/routes/index.ts`，挂载 gift 路由到 /gifts

## 6. CORS 验证

- [x] 6.1 验证 `backend/src/app.ts` 中已配置 CORS 中间件
- [x] 6.2 确认 CORS 配置允许 `http://localhost:5173` 访问
- [x] 6.3 确认 credentials 选项已启用

## 7. 功能测试

- [ ] 7.1 启动后端服务 `cd backend && npm run dev`
- [ ] 7.2 测试 GET /api/gifts 返回空数组
- [ ] 7.3 测试 POST /api/gifts 创建新记录
- [ ] 7.4 测试 GET /api/gifts 返回刚创建的记录
- [ ] 7.5 验证记录按日期倒序排列
- [ ] 7.6 测试缺少必填字段返回 400 错误
- [ ] 7.7 使用 Postman 或 curl 从 localhost:5173 测试 CORS

## 8. 代码优化

- [x] 8.1 添加适当的注释
- [x] 8.2 确保所有函数有类型注解
- [x] 8.3 运行 TypeScript 类型检查 `npm run type-check`
