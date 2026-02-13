# Spec: backend-api

## ADDED Requirements

### Requirement: 项目初始化配置
后端项目必须正确初始化Node.js + Express + TypeScript开发环境。

#### Scenario: 项目结构验证
- **WHEN** 查看backend/目录
- **THEN** 必须包含package.json、tsconfig.json、.env、prisma/目录、src/目录

#### Scenario: 技术栈验证
- **WHEN** 查看backend/package.json
- **THEN** 必须包含express@^4.x、typescript@^5.x、prisma@^5.x、@prisma/client@^5.x、@types/express@^4.x、cors、dotenv依赖

### Requirement: 开发服务器配置
后端开发服务器必须在指定端口运行并支持自动重启。

#### Scenario: 开发服务器启动
- **WHEN** 运行pnpm dev命令
- **THEN** 开发服务器必须在http://localhost:3000启动
- **AND** 使用nodemon或tsx实现文件变更自动重启

#### Scenario: API响应验证
- **WHEN** 发送GET请求到http://localhost:3000/api/health
- **THEN** 必须返回JSON格式健康检查响应，状态码200

### Requirement: Prisma ORM配置
项目必须正确配置Prisma ORM和SQLite数据库。

#### Scenario: Prisma schema配置
- **WHEN** 查看prisma/schema.prisma
- **THEN** 必须配置datasource db使用sqlite提供器
- **AND** 必须配置DATABASE_URL环境变量

#### Scenario: 数据库连接
- **WHEN** 查看src/config/database.ts
- **THEN** 必须导出PrismaClient实例
- **AND** 必须包含连接错误处理

#### Scenario: 数据库迁移
- **WHEN** 运行prisma migrate dev命令
- **THEN** 必须在prisma/migrations/生成迁移文件
- **AND** prisma/dev.db文件必须存在

### Requirement: API路由结构
后端必须定义清晰的API路由结构。

#### Scenario: 路由组织验证
- **WHEN** 查看src/routes/index.ts
- **THEN** 必须使用Express Router
- **AND** 必须导出配置好的路由

#### Scenario: 控制器模式
- **WHEN** 查看src/controllers/
- **THEN** 必须存在基础控制器文件（如user.controller.ts）
- **AND** 控制器必须分离业务逻辑

#### Scenario: 服务层验证
- **WHEN** 查看src/services/
- **THEN** 必须存在基础服务文件（如user.service.ts）
- **AND** 服务层必须处理数据库操作

### Requirement: 中间件配置
后端必须配置必要的Express中间件。

#### Scenario: CORS配置
- **WHEN** 查看src/app.ts
- **THEN** 必须配置CORS中间件允许前端跨域访问

#### Scenario: JSON解析
- **WHEN** 查看src/app.ts
- **THEN** 必须配置express.json()和express.urlencoded()中间件

#### Scenario: 错误处理
- **WHEN** 查看src/middleware/error.middleware.ts
- **THEN** 必须存在全局错误处理中间件
- **AND** 必须返回格式化的错误响应

### Requirement: 环境变量配置
后端必须正确配置环境变量。

#### Scenario: .env文件验证
- **WHEN** 查看backend/.env
- **THEN** 必须定义PORT（默认3000）和DATABASE_URL

#### Scenario: dotenv加载
- **WHEN** 查看src/index.ts或src/app.ts
- **THEN** 必须在应用启动时调用dotenv.config()
