## 1. 后端改造

- [x] 1.1 修改 /api/auth/check-device 接口：设备不存在时自动创建并返回 token
- [x] 1.2 删除 /api/auth/register-pin 接口
- [x] 1.3 删除 /api/auth/verify-pin 接口
- [x] 1.4 测试后端接口

## 2. 前端改造

- [x] 2.1 简化 LoginView.vue：移除 PIN 码输入 UI
- [x] 2.2 修改登录逻辑：页面加载时自动调用 check-device 完成登录
- [x] 2.3 更新提示文案：告知用户数据存储在本地
- [x] 2.4 测试前端构建和功能
