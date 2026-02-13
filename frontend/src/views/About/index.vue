<template>
  <div class="about">
    <van-nav-bar title="关于" left-arrow @click-left="goBack" />
    <div class="content">
      <van-cell-group>
        <van-cell title="过年宝" label="v1.0.0" />
        <van-cell title="技术栈" label="Vue 3 + Vite + TypeScript" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.about {
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    padding: 16px;
  }
}
</style>