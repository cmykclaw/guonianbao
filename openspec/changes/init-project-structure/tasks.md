# Tasks: 过年宝项目初始化

## 1. 根目录Monorepo配置

- [x] 1.1 创建根目录package.json，配置workspaces字段包含["frontend", "backend", "shared"]
- [x] 1.2 创建pnpm-workspace.yaml配置文件
- [x] 1.3 创建根目录.gitignore，忽略node_modules、dist、.env等
- [x] 1.4 创建根目录tsconfig.json，配置references指向子项目
- [x] 1.5 创建README.md，说明项目结构和启动命令

## 2. Shared共享类型包

- [x] 2.1 创建shared/package.json，配置name为"@guonianbao/shared"
- [x] 2.2 创建shared/tsconfig.json，启用declaration生成.d.ts文件
- [x] 2.3 创建shared/src/types/index.ts，定义基础API响应类型和DTO类型
- [x] 2.4 配置shared/package.json的main、types和exports字段

## 3. 后端(Backend)初始化

- [x] 3.1 创建backend/package.json，添加express、typescript、prisma等依赖
- [x] 3.2 创建backend/tsconfig.json，配置严格模式和路径别名
- [x] 3.3 创建backend/.env，配置PORT=3000和DATABASE_URL
- [x] 3.4 创建backend/prisma/schema.prisma，配置SQLite数据源
- [x] 3.5 创建backend/src/index.ts，配置Express应用启动
- [x] 3.6 创建backend/src/app.ts，配置中间件（cors、json解析）
- [x] 3.7 创建backend/src/config/database.ts，配置PrismaClient
- [x] 3.8 创建backend/src/routes/index.ts，配置基础路由
- [x] 3.9 创建backend/src/middleware/error.middleware.ts，配置全局错误处理
- [x] 3.10 添加后端dev脚本（使用tsx或nodemon）
- [ ] 3.11 运行prisma migrate dev初始化数据库

## 4. 前端(Frontend)初始化

- [x] 4.1 运行pnpm create vite frontend --template vue-ts创建Vue 3 + TS项目
- [x] 4.2 安装Vant UI：pnpm add vant
- [x] 4.3 安装Vue Router：pnpm add vue-router@4
- [x] 4.4 安装Pinia：pnpm add pinia
- [x] 4.5 安装Axios：pnpm add axios
- [x] 4.6 配置Vite按需导入Vant组件（vite-plugin-style-import或unplugin-vue-components）
- [x] 4.7 创建src/router/index.ts，配置Vue Router和基础路由
- [x] 4.8 创建src/views/Home/index.vue和About/index.vue页面组件
- [x] 4.9 创建src/App.vue，集成RouterView
- [x] 4.10 更新src/main.ts，挂载Vue应用并配置Pinia
- [x] 4.11 创建src/styles/variables.scss和global.scss
- [x] 4.12 配置index.html的viewport meta标签
- [x] 4.13 配置tsconfig.json的路径别名@/*指向src/*
- [ ] 4.14 测试pnpm dev启动开发服务器

## 5. 工作空间集成和验证

- [x] 5.1 在frontend/package.json添加shared包依赖："@guonianbao/shared": "workspace:*"
- [x] 5.2 在backend/package.json添加shared包依赖："@guonianbao/shared": "workspace:*"
- [ ] 5.3 运行pnpm install在根目录安装所有依赖
- [x] 5.4 创建根目录package.json的dev脚本："dev": "pnpm -r --parallel dev"
- [ ] 5.5 测试根目录pnpm dev同时启动前后端
- [ ] 5.6 验证前端可以访问http://localhost:5173
- [ ] 5.7 验证后端可以访问http://localhost:3000/api/health
- [ ] 5.8 验证shared类型可以在前后端正确导入

## 6. 代码规范和工具配置

- [ ] 6.1 配置ESLint（前端使用@antfu/eslint-config或自定义配置）
- [ ] 6.2 配置Prettier格式化规则
- [ ] 6.3 （可选）配置Husky + lint-staged进行提交前检查
- [x] 6.4 添加.gitignore到frontend和backend目录
- [x] 6.5 更新根目录README.md，添加项目启动和开发说明
