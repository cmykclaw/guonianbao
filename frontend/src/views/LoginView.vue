<template>
  <div class="login-view">
    <div class="login-container">
      <div class="logo">
        <span class="logo-text">🏮 过年宝</span>
      </div>

      <div class="title">
        {{ isRegistered ? '请输入 4 位安全码' : '初次使用，请设置 4 位安全码' }}
      </div>

      <div class="hint">
        安全码用于保护您的礼薄隐私（清空浏览器缓存将丢失数据）
      </div>

      <van-password-input
        :value="pin"
        :length="4"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />

      <van-number-keyboard
        v-model="pin"
        :show="showKeyboard"
        :maxlength="4"
        @blur="showKeyboard = false"
      />

      <van-loading v-if="loading" class="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const deviceId = ref('')
const pin = ref('')
const isRegistered = ref(false)
const loading = ref(false)
const showKeyboard = ref(true)

function getOrCreateDeviceId(): string {
  let id = localStorage.getItem('deviceId')
  if (!id) {
    id = Date.now().toString() + Math.random().toString(36).substring(2)
    localStorage.setItem('deviceId', id)
  }
  return id
}

async function checkDeviceStatus() {
  deviceId.value = getOrCreateDeviceId()
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check-device`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: deviceId.value })
    })
    const data = await response.json()
    // 后端返回 isRegistered 时，强制转换为布尔值，防止前端误判
    isRegistered.value = Boolean(data.isRegistered)
  } catch (error) {
    console.error('Check device error:', error)
  }
}

async function submitPin() {
  if (pin.value.length !== 4) return

  loading.value = true
  
  deviceId.value = getOrCreateDeviceId()

  const endpoint = isRegistered.value ? '/api/auth/verify-pin' : '/api/auth/register-pin'

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId: deviceId.value,
        pin: pin.value
      })
    })

    if (!response.ok) {
      throw new Error('Auth failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    showToast('登录成功')
    router.replace('/gifts')
  } catch (error) {
    console.error('Auth error:', error)
    if (isRegistered.value) {
      // 已注册设备，走验证流程
      showToast('安全码错误，请重试')
    } else {
      // 未注册设备，走注册流程
      showToast('安全码设置失败，请重试')
    }
    // 无论注册还是验证，只要接口报错，都清空输入
    pin.value = ''
  } finally {
    loading.value = false
  }
}

watch(pin, (newVal) => {
  if (newVal.length === 4) {
    submitPin()
  }
})

onMounted(() => {
  deviceId.value = getOrCreateDeviceId()
  checkDeviceStatus()
})
</script>

<style scoped lang="scss">
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
}

.login-container {
  width: 100%;
  max-width: 360px;
  padding: 20px;
}

.logo {
  text-align: center;
  margin-bottom: 40px;

  .logo-text {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.title {
  text-align: center;
  font-size: 18px;
  color: #fff;
  margin-bottom: 8px;
  font-weight: 500;
}

.hint {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
</style>
