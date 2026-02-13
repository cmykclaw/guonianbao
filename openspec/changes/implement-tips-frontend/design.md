## Context

当前 TipsView.vue 仅有静态数据，需要升级为"静态预设 + AI 实时生成"的混合模式。用户可以输入上下文生成定制化拜年吉祥话和高情商回复。

## Goals / Non-Goals

**Goals:**
- 保留 van-tabs 页面结构
- 实现 AI 交互区（输入框 + 按钮）
- 调用后端 /api/tips/generate 接口
- 实现复制功能
- 保留静态 Mock 数据

**Non-Goals:**
- 不修改后端接口
- 不实现其他 AI 模型

## Decisions

### 1. 页面结构
- van-tabs 两个 Tab：定制吉祥话、高情商防身
- 每个 Tab 下：AI 交互区 → AI 结果展示 → 静态数据折叠面板

### 2. API 调用
- Endpoint: POST http://localhost:3000/api/tips/generate
- type: "greeting" 或 "comeback"
- context: 用户输入

### 3. 复制功能
- 使用 navigator.clipboard.writeText
- 成功后 showToast('复制成功')

## Risks / Trade-offs

| 风险 | 描述 | 缓解措施 |
|------|------|----------|
| 网络失败 | API 调用失败 | 保留静态数据兜底，显示错误 toast |
