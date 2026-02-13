<template>
  <div class="home">
    <van-nav-bar title="过年宝" />
    <div class="content">
      <van-cell-group>
        <van-cell title="欢迎使用过年宝" label="春节互动活动平台" />
      </van-cell-group>
      <div class="actions">
        <van-button type="primary" block @click="goToAbout">
          了解更多
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    padding: 16px;
  }

  .actions {
    margin-top: 24px;
  }
}
</style>