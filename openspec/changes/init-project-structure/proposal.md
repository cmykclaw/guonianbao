# 过年宝 - 移动端Web应用项目

## Why

需要开发一个名为"过年宝"的移动端Web应用，用于春节期间的用户互动和活动管理。采用Monorepo架构统一管理前后端代码，确保开发效率和一致性。

## What Changes

- 初始化Monorepo项目结构
- 创建前端应用（Vue 3 + Vite + TypeScript + Vant UI）
- 创建后端API服务（Node.js + Express + TypeScript + Prisma）
- 配置共享类型定义和工具库
- 设置开发环境和工作流程

## Capabilities

### New Capabilities
- `frontend-mobile`: 移动端前端应用，基于Vue 3 + Vite + TypeScript + Vant UI
- `backend-api`: 后端API服务，基于Node.js + Express + TypeScript + Prisma + SQLite
- `shared-types`: 前后端共享的TypeScript类型定义

### Modified Capabilities
- （无现有spec需要修改）

## Impact

- 项目根目录结构变更
- 新增前端/后端/共享模块目录
- 需要配置workspace管理和构建流程
- 影响开发环境设置和部署流程
