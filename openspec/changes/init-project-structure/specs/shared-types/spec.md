# Spec: shared-types

## ADDED Requirements

### Requirement: 共享类型包配置
必须创建独立的shared包用于前后端共享类型定义。

#### Scenario: 项目结构验证
- **WHEN** 查看shared/目录
- **THEN** 必须包含package.json、tsconfig.json、src/目录

#### Scenario: TypeScript配置
- **WHEN** 查看shared/tsconfig.json
- **THEN** 必须配置declaration: true生成.d.ts文件
- **AND** 必须配置outDir指定输出目录

### Requirement: 类型导出
共享包必须正确定义和导出共享类型。

#### Scenario: 类型文件组织
- **WHEN** 查看src/types/index.ts
- **THEN** 必须定义基础API响应类型
- **AND** 必须定义前后端共享的DTO类型

#### Scenario: 包导出配置
- **WHEN** 查看shared/package.json
- **THEN** 必须配置main和types字段指向编译后的入口
- **AND** 必须配置exports字段支持现代导入

### Requirement: 工作空间集成
共享包必须正确集成到pnpm workspaces中。

#### Scenario: 工作空间配置
- **WHEN** 查看根目录package.json或pnpm-workspace.yaml
- **THEN** shared/必须在workspaces配置中

#### Scenario: 跨包引用
- **WHEN** frontend/package.json和backend/package.json
- **THEN** 必须包含对shared包的引用（如"shared": "workspace:*"）

#### Scenario: 类型导入
- **WHEN** 在frontend或backend代码中导入shared类型
- **THEN** 必须能正确解析类型定义
- **AND** TypeScript必须能识别共享类型
