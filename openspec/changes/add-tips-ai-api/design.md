## Context

项目已有智谱 AI 接口配置，需要复用 OpenAI 客户端来生成拜年锦囊。用户可以选择生成拜年吉祥话或应对亲戚的回复。

## Goals / Non-Goals

**Goals:**
- 创建 POST /api/tips/generate 接口
- 支持 type: greeting（拜年吉祥话）和 type: comeback（应对回复）
- 使用不同的 System Prompt 生成不同类型内容
- 解析 AI 返回的 JSON 数组

**Non-Goals:**
- 不修改前端代码
- 不实现其他类型的内容生成

## Decisions

### 1. System Prompt 设计
- **greeting**: 高情商拜年文案大师，生成 3 条风格不同的吉祥话
- **comeback**: 沟通大师，生成 3 条高情商回复

### 2. 返回值处理
- 尝试 JSON.parse 解析返回文本
- 解析失败时返回单元素数组

## Risks / Trade-offs

| 风险 | 描述 | 缓解措施 |
|------|------|----------|
| AI 返回非 JSON | 模型未按要求返回 JSON | try-catch 捕获，原文返回 |
