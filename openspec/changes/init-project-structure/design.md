# 过年宝 - 项目架构设计

## Context

过年宝是一个移动端Web应用项目，采用Monorepo架构管理前后端代码。项目需要支持快速开发和部署，使用现代技术栈确保开发体验和性能。

### 技术约束
- 移动端优先设计（Mobile First）
- 需要支持TypeScript全栈开发
- 数据库使用SQLite便于快速开发和部署
- 使用pnpm workspace管理依赖

## Goals / Non-Goals

**Goals:**
- 建立清晰的Monorepo项目结构
- 配置前端Vue 3 + Vite + TypeScript + Vant UI开发环境
- 配置后端Node.js + Express + TypeScript + Prisma开发环境
- 定义前后端通信规范和共享类型
- 配置开发工具和代码规范

**Non-Goals:**
- 具体的业务逻辑实现（登录、支付等）
- 生产环境部署配置（CI/CD、Docker等）
- 完整的API接口设计
- UI/UX设计规范

## Decisions

### 1. Monorepo结构采用pnpm workspaces

**决策**: 使用pnpm workspaces管理Monorepo，根目录package.json配置workspaces字段。

**理由**:
- pnpm高效的依赖管理，避免重复安装
- 原生支持workspaces，配置简单
- 严格的依赖隔离，避免幽灵依赖

**替代方案**: 
- Lerna + npm/yarn: 工具链过重，适合大型项目
- Turborepo: 适合大型monorepo，但本项目初期规模较小

### 2. 前端目录结构 (frontend/)

```
frontend/
├── package.json              # 前端依赖配置
├── tsconfig.json             # TypeScript配置
├── vite.config.ts            # Vite构建配置
├── index.html                # 入口HTML
├── src/
│   ├── main.ts               # 应用入口
│   ├── App.vue               # 根组件
│   ├── router/               # Vue Router配置
│   │   └── index.ts
│   ├── views/                # 页面视图
│   │   ├── Home/
│   │   │   └── index.vue
│   │   └── About/
│   │       └── index.vue
│   ├── components/           # 公共组件
│   │   └── common/
│   ├── composables/          # 组合式函数
│   ├── stores/               # Pinia状态管理
│   ├── api/                  # API请求封装
│   ├── utils/                # 工具函数
│   ├── styles/               # 全局样式
│   │   ├── variables.scss    # SCSS变量
│   │   └── global.scss       # 全局样式
│   └── types/                # 前端类型定义
├── public/                   # 静态资源
└── .env                      # 环境变量
```

**技术栈**:
- Vue 3 (Composition API)
- Vite (构建工具)
- TypeScript
- Vant UI (Mobile first组件库)
- Vue Router 4 (路由管理)
- Pinia (状态管理)
- Axios (HTTP客户端)

**理由**:
- Vite提供极速的开发体验
- Vant UI专为移动端设计，组件丰富
- Composition API提供更好的代码复用和类型支持

### 3. 后端目录结构 (backend/)

```
backend/
├── package.json              # 后端依赖配置
├── tsconfig.json             # TypeScript配置
├── .env                      # 环境变量
├── prisma/
│   ├── schema.prisma         # Prisma数据模型
│   └── migrations/           # 数据库迁移文件
├── src/
│   ├── index.ts              # 服务入口
│   ├── app.ts                # Express应用配置
│   ├── routes/               # 路由定义
│   │   └── index.ts
│   ├── controllers/          # 控制器
│   │   └── user.controller.ts
│   ├── services/             # 业务逻辑层
│   │   └── user.service.ts
│   ├── middleware/           # 中间件
│   │   ├── error.middleware.ts
│   │   └── auth.middleware.ts
│   ├── models/               # 数据模型类型
│   ├── utils/                # 工具函数
│   └── config/               # 配置文件
│       └── database.ts
└── prisma/dev.db             # SQLite数据库文件
```

**技术栈**:
- Node.js
- Express.js (Web框架)
- TypeScript
- Prisma (ORM)
- SQLite (数据库)
- CORS (跨域支持)
- dotenv (环境变量)

**理由**:
- Express生态成熟，社区活跃
- Prisma提供类型安全的ORM和自动迁移
- SQLite适合小型应用，无需额外数据库服务

### 4. 共享类型目录 (shared/)

```
shared/
├── package.json              # 共享包配置
├── tsconfig.json             # TypeScript配置
└── src/
    └── types/                # 共享类型定义
        └── index.ts
```

**理由**:
- 前后端共享DTO和类型定义
- 确保API契约一致性
- 避免类型重复定义

### 5. 根目录结构

```
guonianbao/
├── package.json              # 根配置，workspaces定义
├── pnpm-workspace.yaml       # pnpm workspace配置
├── tsconfig.json             # 根TypeScript配置
├── .gitignore                # Git忽略规则
├── README.md                 # 项目说明
├── frontend/                 # 前端应用
├── backend/                  # 后端服务
└── shared/                   # 共享代码
```

### 6. 依赖管理策略

**根package.json配置**:
```json
{
  "name": "guonianbao",
  "private": true,
  "workspaces": [
    "frontend",
    "backend",
    "shared"
  ],
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint"
  }
}
```

**理由**:
- 使用pnpm `-r` (recursive) 命令批量运行脚本
- `--parallel` 并行启动前后端开发服务器

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Monorepo可能导致构建时间增加 | 使用Vite和pnpm优化，后期可引入Turborepo |
| SQLite不适合高并发生产环境 | 初期快速开发使用，生产环境可迁移到PostgreSQL |
| 共享类型可能引入耦合 | 仅共享DTO和接口类型，不共享业务逻辑 |
| 移动端兼容性风险 | Vant UI已处理大部分兼容性问题，需要真机测试 |
| TypeScript学习成本 | 提供类型示例和文档，使用严格模式确保质量 |

## Migration Plan

### 初始化步骤
1. 创建根目录和package.json配置workspaces
2. 初始化frontend目录，安装Vue 3 + Vite + Vant UI
3. 初始化backend目录，安装Express + Prisma
4. 配置共享类型包
5. 配置开发脚本和工具链

### 开发工作流
1. 根目录运行 `pnpm install` 安装所有依赖
2. 运行 `pnpm dev` 同时启动前后端开发服务器
3. 前端端口默认5173，后端端口默认3000

## Open Questions

1. 是否需要配置API代理解决开发环境跨域问题？
2. 是否需要添加代码提交规范（Husky + lint-staged）？
3. 是否需要配置单元测试框架（Vitest + Jest）？
4. 生产环境的域名和部署策略？
