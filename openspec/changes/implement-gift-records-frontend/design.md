# 礼薄功能前端设计

## Context

过年宝前端项目已经搭建完成（Vue 3 + Vite + TypeScript + Vant UI）。后端API已实现礼薄功能，现在需要实现前端界面与之对接。

### 当前状态
- Vue 3 + Vant UI 已配置
- 后端 API 已就绪（GET/POST /api/gifts）
- 共享类型已定义（GiftRecordDTO, CreateGiftRecordRequest）
- 路由系统已搭建

## Goals / Non-Goals

**Goals:**
- 实现礼薄页面的完整UI
- 展示收礼/送礼统计数据
- 展示礼薄记录列表
- 实现新增记录功能
- 对接后端API获取和保存数据

**Non-Goals:**
- 编辑/删除记录功能
- 数据筛选和搜索
- 分页功能（假设记录不会太多）
- 离线存储

## Decisions

### 1. 页面结构

**文件位置**: `frontend/src/views/GiftBookView.vue`

**页面布局**:
```
┌─────────────────────────────┐
│  过年宝 - 礼薄                │  ← NavBar
├─────────────────────────────┤
│  ┌──────────┐ ┌──────────┐  │
│  │ 总收礼   │ │ 总送礼   │  │  ← 统计卡片 (van-grid)
│  │ ¥10,000 │ │ ¥5,000  │  │
│  └──────────┘ └──────────┘  │
├─────────────────────────────┤
│  记录列表                     │
│  ┌────────────────────────┐ │
│  │ 张三          +1000   │ │  ← List Item
│  │ 2024-02-10   结婚礼金 │ │
│  └────────────────────────┘ │
│  ┌────────────────────────┐ │
│  │ 李四           -500   │ │
│  │ 2024-02-11   生日红包 │ │
│  └────────────────────────┘ │
├─────────────────────────────┤
│                      ┌────┐ │
│                      │ +  │ │  ← 悬浮按钮
│                      └────┘ │
└─────────────────────────────┘
```

### 2. 统计卡片设计

**组件**: van-grid (2列)

**样式**:
- 收礼卡片: 红色主题 (van-grid-item 自定义样式)
- 送礼卡片: 绿色主题
- 金额使用大号字体

**数据计算**:
```typescript
const totalReceived = computed(() => 
  records.value
    .filter(r => r.type === 'RECEIVED')
    .reduce((sum, r) => sum + r.amount, 0)
)

const totalGiven = computed(() => 
  records.value
    .filter(r => r.type === 'GIVEN')
    .reduce((sum, r) => sum + r.amount, 0)
)
```

### 3. 列表设计

**组件**: van-list + van-cell

**列表项显示**:
- 左侧: 人名 + 日期（小号灰色）
- 右侧: 金额（带符号）
  - 收礼: 红色 `+¥1,000`
  - 送礼: 绿色 `-¥500`
- 备注作为描述文字（可选显示）

**空状态**: van-empty 组件

### 4. 悬浮按钮和弹窗

**悬浮按钮**:
- 组件: van-floating-bubble 或自定义 fixed 定位 div
- 位置: 右下角 (right: 20px, bottom: 100px)
- 样式: 圆形，蓝色背景，白色加号

**底部弹窗**:
- 组件: van-popup (position="bottom")
- 高度: 70% 屏幕高度
- 内容: 
  - van-form 表单
  - van-field (name)
  - van-radio-group (type: RECEIVED/GIVEN)
  - van-field (amount, type="number")
  - van-field (notes, type="textarea")
  - van-button (submit)

### 5. API 集成

**HTTP Client**: 使用 fetch API（无需额外依赖）

**Base URL**: `http://localhost:3000/api`

**API 封装**:
```typescript
// api/gift.ts
const API_BASE = 'http://localhost:3000/api'

export async function getGiftRecords(): Promise<GiftRecordDTO[]> {
  const response = await fetch(`${API_BASE}/gifts`)
  const result = await response.json()
  return result.data
}

export async function createGiftRecord(data: CreateGiftRecordRequest): Promise<GiftRecordDTO> {
  const response = await fetch(`${API_BASE}/gifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result.data
}
```

### 6. 数据管理

**使用 Pinia Store** (可选) 或 **Composition API**:

选择使用 Composition API 在组件内管理状态，因为数据主要是页面级别的。

**状态**:
```typescript
const records = ref<GiftRecordDTO[]>([])
const loading = ref(false)
const showAddModal = ref(false)

// 表单数据
const formData = reactive({
  name: '',
  type: 'RECEIVED' as 'RECEIVED' | 'GIVEN',
  amount: 0,
  notes: ''
})
```

**生命周期**:
- onMounted: 加载数据
- 提交表单后: 重新加载数据，关闭弹窗

### 7. 样式设计

**金额颜色**:
```scss
.amount-received {
  color: #ee0a24; // Vant 红色
}

.amount-given {
  color: #07c160; // Vant 绿色
}
```

**悬浮按钮**:
```scss
.fab-button {
  position: fixed;
  right: 20px;
  bottom: 100px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--van-primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| API 请求失败 | 添加 try-catch 和错误提示 (van-toast) |
| 大数据量渲染性能 | 后续可添加分页或虚拟滚动 |
| 移动端软键盘遮挡 | 确保表单在视口内，必要时滚动 |
| 金额计算精度 | 使用整数（分）存储，显示转换为元 |

## Migration Plan

1. 创建 GiftBookView.vue 组件文件
2. 实现统计卡片区域
3. 实现列表展示区域
4. 实现悬浮按钮和弹窗
5. 实现表单和API对接
6. 更新路由配置（替换原有的 GiftRecords 页面）
7. 测试功能完整性

## Open Questions

1. 是否需要显示记录总数统计？
2. 日期显示格式是否需要本地化？
3. 是否需要支持编辑已添加的记录？
4. 金额是否需要支持小数（角分）？
