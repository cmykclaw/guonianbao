<template>
  <div class="login-view">
    <div class="login-container">
      <div class="logo">
        <span class="logo-text">🏮 过年宝</span>
      </div>

      <div class="title">
        正在进入...
      </div>

      <div class="hint">
        您的数据存储在当前设备，清空浏览器缓存将丢失数据
      </div>

      <van-loading v-if="loading" class="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const loading = ref(false)

function getOrCreateDeviceId(): string {
  let id = localStorage.getItem('deviceId')
  if (!id) {
    id = Date.now().toString() + Math.random().toString(36).substring(2)
    localStorage.setItem('deviceId', id)
  }
  return id
}

async function autoLogin() {
  loading.value = true
  
  const deviceId = getOrCreateDeviceId()

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check-device`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId })
    })

    if (!response.ok) {
      throw new Error('Auth failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    router.replace('/gifts')
  } catch (error) {
    console.error('Auto login error:', error)
    showToast('登录失败，请重试')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  autoLogin()
})
</script>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    return { loading: ref(false) }
  }
}
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
