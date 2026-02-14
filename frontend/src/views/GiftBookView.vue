<template>
  <div class="gift-book">
    <van-nav-bar title="礼薄" fixed placeholder />
    
    <!-- 统计区域 -->
    <div class="statistics">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item>
          <div class="stat-card received">
            <div class="stat-label">总收礼</div>
            <div class="stat-amount">{{ formatAmount(totalReceived) }}</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="stat-card given">
            <div class="stat-label">总送礼</div>
            <div class="stat-amount">{{ formatAmount(totalGiven) }}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 记录列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell
          v-for="record in records"
          :key="record.id"
          :title="record.name"
          :label="formatDate(record.date)"
        >
          <template #value>
            <span :class="record.type === 'RECEIVED' ? 'amount-received' : 'amount-given'">
              {{ record.type === 'RECEIVED' ? '+' : '-' }}{{ formatAmount(record.amount) }}
            </span>
          </template>
          <template #label v-if="record.notes">
            <div>{{ formatDate(record.date) }}</div>
            <div class="record-notes">{{ record.notes }}</div>
          </template>
        </van-cell>
        <van-empty v-if="records.length === 0" description="暂无记录" />
      </van-list>
    </van-pull-refresh>

    <!-- 悬浮按钮 -->
    <div class="fab-button" @click="showAddModal = true">
      <van-icon name="plus" size="24" />
    </div>

    <!-- 添加记录弹窗 -->
    <van-popup
      v-model:show="showAddModal"
      position="bottom"
      :style="{ height: '70%' }"
      round
    >
      <div class="popup-header">
        <span class="popup-title">添加记录</span>
        <van-icon name="cross" @click="showAddModal = false" />
      </div>
      
      <van-form @submit="onSubmit" class="gift-form">
        <van-field
          v-model="formData.name"
          name="name"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        
        <van-field name="type" label="类型">
          <template #input>
            <van-radio-group v-model="formData.type" direction="horizontal">
              <van-radio name="RECEIVED">收礼</van-radio>
              <van-radio name="GIVEN">送礼</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        
        <van-field
          v-model="formData.amount"
          name="amount"
          label="金额"
          type="number"
          placeholder="请输入金额"
          :rules="[{ required: true, message: '请填写金额' }]"
        />
        
        <van-field
          v-model="formData.notes"
          name="notes"
          label="备注"
          type="textarea"
          placeholder="请输入备注（可选）"
          rows="2"
          autosize
        />
        
        <div class="form-actions">
          <van-button round block type="primary" native-type="submit" :loading="submitting">
            保存
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onActivated, reactive } from 'vue'
import { showToast } from 'vant'
import type { GiftRecordDTO, CreateGiftRecordRequest } from '@guonianbao/shared'
import { getGiftRecords, createGiftRecord } from '@/api/gift'

// 缓存变量
let lastFetchTime = 0

// 数据状态
const records = ref<GiftRecordDTO[]>([])
const loading = ref(false)
const refreshing = ref(false)
const finished = ref(true)
const showAddModal = ref(false)
const submitting = ref(false)

// 表单数据
const formData = reactive<CreateGiftRecordRequest>({
  name: '',
  type: 'RECEIVED',
  amount: 0,
  notes: ''
})

// 计算总收礼金额
const totalReceived = computed(() => {
  return records.value
    .filter(r => r.type === 'RECEIVED')
    .reduce((sum, r) => sum + r.amount, 0)
})

// 计算总送礼金额
const totalGiven = computed(() => {
  return records.value
    .filter(r => r.type === 'GIVEN')
    .reduce((sum, r) => sum + r.amount, 0)
})

// 格式化金额（添加千分位和¥符号）
const formatAmount = (amount: number): string => {
  return '¥' + amount.toLocaleString('zh-CN')
}

// 格式化日期
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}

// 加载数据
const loadGifts = async (force = false) => {
  const now = Date.now()
  if (!force && lastFetchTime > 0 && now - lastFetchTime < 30000 && records.value.length > 0) {
    refreshing.value = false
    return
  }
  
  loading.value = true
  try {
    records.value = await getGiftRecords()
    lastFetchTime = now
  } catch (error) {
    showToast('加载数据失败')
    console.error(error)
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

// 下拉刷新
const onRefresh = async () => {
  await loadGifts(true)
}

// 提交表单
const onSubmit = async () => {
  submitting.value = true
  try {
    await createGiftRecord(formData)
    showToast('添加成功')
    showAddModal.value = false
    // 重置表单
    formData.name = ''
    formData.type = 'RECEIVED'
    formData.amount = 0
    formData.notes = ''
    // 刷新列表
    await loadGifts(true)
  } catch (error) {
    showToast('添加失败')
    console.error(error)
  } finally {
    submitting.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadGifts()
})

// 页面激活时刷新数据（从 keep-alive 缓存返回时触发）
onActivated(() => {
  loadGifts(true)
})
</script>

<style scoped lang="scss">
.gift-book {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: calc(var(--van-tabbar-height) + env(safe-area-inset-bottom) + 80px);
}

.statistics {
  padding: 12px;
  background-color: #fff;
  margin-bottom: 10px;
}

.stat-card {
  text-align: center;
  padding: 16px 8px;
  border-radius: 8px;
  background-color: #f8f8f8;

  .stat-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .stat-amount {
    font-size: 24px;
    font-weight: bold;
  }

  &.received .stat-amount {
    color: #ee0a24;
  }

  &.given .stat-amount {
    color: #07c160;
  }
}

.record-list {
  background-color: #fff;
  min-height: 200px;
}

.amount-received {
  color: #ee0a24;
  font-weight: 500;
}

.amount-given {
  color: #07c160;
  font-weight: 500;
}

.record-notes {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.fab-button {
  position: fixed;
  right: 20px;
  bottom: 100px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--van-primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 99;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ebedf0;

  .popup-title {
    font-size: 16px;
    font-weight: 500;
  }
}

.gift-form {
  padding: 16px;
}

.form-actions {
  margin-top: 24px;
  padding: 0 16px;
}
</style>