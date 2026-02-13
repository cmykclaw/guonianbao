# Spec: frontend-mobile

## ADDED Requirements

### Requirement: 项目初始化配置
前端项目必须正确初始化Vue 3 + Vite + TypeScript开发环境。

#### Scenario: 项目结构验证
- **WHEN** 查看frontend/目录
- **THEN** 必须包含package.json、vite.config.ts、tsconfig.json、index.html、src/目录、public/目录

#### Scenario: 技术栈验证
- **WHEN** 查看frontend/package.json
- **THEN** 必须包含vue@^3.x、vite@^5.x、typescript@^5.x、vant@^4.x、vue-router@^4.x依赖

### Requirement: 开发服务器配置
前端开发服务器必须在默认端口运行，并支持HMR（热模块替换）。

#### Scenario: 开发服务器启动
- **WHEN** 运行pnpm dev命令
- **THEN** 开发服务器必须在http://localhost:5173启动
- **AND** 修改代码后页面必须自动刷新

### Requirement: 路由配置
项目必须配置Vue Router并定义基础路由结构。

#### Scenario: 路由文件验证
- **WHEN** 查看src/router/index.ts
- **THEN** 必须存在并导出router实例
- **AND** 必须配置至少Home和About两个路由

#### Scenario: 页面组件验证
- **WHEN** 访问http://localhost:5173/
- **THEN** 必须渲染Home页面
- **AND** 访问http://localhost:5173/about必须渲染About页面

### Requirement: UI组件库集成
项目必须集成Vant UI组件库并正确配置。

#### Scenario: Vant组件可用
- **WHEN** 在任意.vue文件中使用Vant组件（如<van-button>）
- **THEN** 组件必须正确渲染且样式正确

#### Scenario: 按需导入配置
- **WHEN** 查看vite.config.ts
- **THEN** 必须配置vant按需导入（unplugin-vue-components或vite-plugin-style-import）

### Requirement: 移动适配
项目必须配置移动端适配方案。

#### Scenario: viewport配置
- **WHEN** 查看index.html
- **THEN** 必须包含viewport meta标签配置

#### Scenario: 响应式设计
- **WHEN** 在不同移动设备宽度下查看页面
- **THEN** 页面布局必须正确适配

### Requirement: TypeScript配置
项目必须使用严格模式TypeScript并正确配置路径别名。

#### Scenario: 严格模式验证
- **WHEN** 查看tsconfig.json
- **THEN** strict选项必须设置为true
- **AND** 必须配置@/*路径别名指向src/目录

#### Scenario: 类型检查
- **WHEN** 运行pnpm type-check或pnpm build
- **THEN** 必须无TypeScript编译错误
