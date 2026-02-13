# 礼薄功能前端实现

## Why

过年宝应用需要实现"礼薄"功能的前端界面，让用户能够直观地查看送礼/收礼记录、统计数据，并方便地添加新记录。后端API已经实现，现在需要对接并构建用户界面。

## What Changes

- 创建 `frontend/src/views/GiftBookView.vue` 礼薄页面组件
- 实现顶部统计卡片（总收礼金额、总送礼金额）
- 实现礼薄记录列表（使用 Vant List 和 Cell 组件）
- 实现悬浮新增按钮和底部弹窗表单
- 对接后端 API (`http://localhost:3000/api/gifts`)
- 使用 axios 进行 HTTP 请求
- 配置金额颜色显示（收礼红色+，送礼绿色-）

## Capabilities

### New Capabilities
- `gift-book-view`: 礼薄页面组件，包含统计、列表、表单
- `gift-statistics`: 顶部统计卡片展示
- `gift-list`: 礼薄记录列表展示
- `gift-form-modal`: 新增记录表单弹窗
- `gift-api-client`: API 客户端封装，对接后端接口

### Modified Capabilities
- （无现有spec需要修改）

## Impact

- 新增前端页面组件
- 更新路由配置（可能需要修改路径）
- 引入 axios 依赖（如使用）
- 需要确保 CORS 配置正确
- 不影响其他功能模块
