## Context

当前系统使用 PIN 码保护用户数据，但体验不佳。用户需要记住 4 位安全码，且每次登录都要输入。改为设备 ID 自动登录后，用户无需任何操作即可自动登录。

## Goals / Non-Goals

**Goals:**
- 移除 PIN 码相关 UI 和逻辑
- 使用设备 ID 作为唯一标识
- 用户首次访问自动创建设备记录
- 后续访问自动登录

**Non-Goals:**
- 不添加额外的用户验证（如手机号、邮箱）
- 不影响现有数据

## Decisions

1. **简化认证流程**
   - 保留 check-device 接口
   - 设备不存在时自动创建并返回 token
   - 设备已存在时直接返回 token

2. **前端简化**
   - 移除密码输入键盘
   - 页面加载时自动获取 deviceId
   - 调用 check-device 接口完成登录

3. **后端调整**
   - 删除 register-pin、verify-pin 接口
   - check-device 接口返回 token

## Risks / Trade-offs

- 风险：清除浏览器缓存后设备 ID 丢失，数据无法恢复
- 缓解：在 UI 上提醒用户数据存储在本地
