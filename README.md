# 过年宝 (GuoNianBao)

移动端Web应用 - 春节互动活动平台

## 项目结构

这是一个Monorepo项目，使用pnpm workspaces管理：

```
guonianbao/
├── frontend/          # 前端应用 (Vue 3 + Vite + TypeScript)
├── backend/           # 后端服务 (Node.js + Express + Prisma)
├── shared/            # 共享类型定义
└── package.json       # 根配置
```

## 技术栈

### 前端
- Vue 3 (Composition API)
- Vite (构建工具)
- TypeScript
- Vant UI (移动端组件库)
- Vue Router 4
- Pinia (状态管理)
- Axios (HTTP客户端)

### 后端
- Node.js
- Express.js
- TypeScript
- Prisma (ORM)
- SQLite (数据库)

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

同时启动前后端开发服务器：

```bash
pnpm dev
```

- 前端: http://localhost:5173
- 后端: http://localhost:3000

### 单独启动

```bash
# 仅前端
cd frontend && pnpm dev

# 仅后端
cd backend && pnpm dev
```

## 开发指南

### 添加新依赖

```bash
# 根目录依赖
pnpm add -D <package>

# 前端依赖
cd frontend && pnpm add <package>

# 后端依赖
cd backend && pnpm add <package>
```

### 数据库操作

```bash
cd backend

# 生成迁移
npx prisma migrate dev

# 重置数据库
npx prisma migrate reset

# 查看数据库
npx prisma studio
```

## 项目规范

- 使用TypeScript严格模式
- 遵循ESLint代码规范
- 提交前运行代码检查

## License

MIT