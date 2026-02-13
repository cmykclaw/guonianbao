# Tasks: 基础UI布局实现

## 1. 礼薄页面组件

- [x] 1.1 创建 `src/views/GiftRecords/` 目录
- [x] 1.2 创建 `src/views/GiftRecords/index.vue` 组件
- [x] 1.3 添加页面基础结构：template包含标题"礼薄"和占位内容
- [x] 1.4 添加组件script setup代码和基础样式

## 2. 锦囊页面组件

- [x] 2.1 创建 `src/views/Tips/` 目录
- [x] 2.2 创建 `src/views/Tips/index.vue` 组件
- [x] 2.3 添加页面基础结构：template包含标题"锦囊"和占位内容
- [x] 2.4 添加组件script setup代码和基础样式

## 3. 亲戚页面组件

- [x] 3.1 创建 `src/views/Relatives/` 目录
- [x] 3.2 创建 `src/views/Relatives/index.vue` 组件
- [x] 3.3 添加页面基础结构：template包含标题"亲戚"和占位内容
- [x] 3.4 添加组件script setup代码和基础样式

## 4. 路由配置更新

- [x] 4.1 更新 `src/router/index.ts`，添加三个新路由
- [x] 4.2 配置 `/gifts` 路由指向 GiftRecords 组件
- [x] 4.3 配置 `/tips` 路由指向 Tips 组件
- [x] 4.4 配置 `/relatives` 路由指向 Relatives 组件
- [x] 4.5 添加根路径 `/` 重定向到 `/gifts`

## 5. App.vue 底部导航实现

- [x] 5.1 修改 `src/App.vue`，添加 Tabbar 布局结构
- [x] 5.2 引入并使用 `van-tabbar` 和 `van-tabbar-item` 组件
- [x] 5.3 添加"礼薄" TabbarItem，配置图标为 `records`，路由为 `/gifts`
- [x] 5.4 添加"锦囊" TabbarItem，配置图标为 `guide-o`，路由为 `/tips`
- [x] 5.5 添加"亲戚" TabbarItem，配置图标为 `friends-o`，路由为 `/relatives`
- [x] 5.6 绑定 Tabbar v-model 到当前路由，实现激活状态同步
- [x] 5.7 添加路由切换处理函数，点击 TabbarItem 时导航到对应路由

## 6. 样式优化

- [x] 6.1 添加内容区域样式，确保不被 Tabbar 遮挡
- [x] 6.2 配置移动端安全区域适配（padding-bottom: env(safe-area-inset-bottom)）
- [x] 6.3 确保 Vant UI 样式正确加载，导航栏显示正常

## 7. 功能验证

- [ ] 7.1 启动开发服务器，验证无编译错误
- [ ] 7.2 访问 `/gifts` 验证礼薄页面显示正常
- [ ] 7.3 访问 `/tips` 验证锦囊页面显示正常
- [ ] 7.4 访问 `/relatives` 验证亲戚页面显示正常
- [ ] 7.5 点击底部导航栏，验证路由切换正常
- [ ] 7.6 验证当前页面 TabbarItem 高亮显示
