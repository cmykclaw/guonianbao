<template>
  <div class="app">
    <div class="content">
      <router-view />
    </div>
    <van-tabbar v-model="activeTab" @change="onTabChange">
      <van-tabbar-item icon="records" to="/gifts">礼薄</van-tabbar-item>
      <van-tabbar-item icon="guide-o" to="/tips">锦囊</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/relatives">亲戚</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 标签页索引映射
const tabIndexMap: Record<string, number> = {
  '/gifts': 0,
  '/tips': 1,
  '/relatives': 2,
}

const activeTab = ref(0)

// 根据当前路由同步激活状态
watch(
  () => route.path,
  (path) => {
    const index = tabIndexMap[path]
    if (index !== undefined) {
      activeTab.value = index
    }
  },
  { immediate: true }
)

// Tabbar 切换事件
const onTabChange = (index: number) => {
  const routes = ['/gifts', '/tips', '/relatives']
  const targetRoute = routes[index]
  if (targetRoute && route.path !== targetRoute) {
    router.push(targetRoute)
  }
}
</script>

<style lang="scss">
@use './styles/variables' as *;
@use './styles/global.scss';

:root {
  /* 全局主色调：喜庆的中国红 */
  --van-primary-color: #ee0a24;
  
  /* 顶部导航栏定制：红底白字 */
  --van-nav-bar-background: #ee0a24;
  --van-nav-bar-title-text-color: #ffffff;
  --van-nav-bar-icon-color: #ffffff;
  --van-nav-bar-text-color: #ffffff;
  
  /* 底部标签栏选中颜色 */
  --van-tabbar-item-active-color: #ee0a24;

  /* 按钮定制：让主要按钮更圆润饱满一点 */
  --van-button-primary-background: #ee0a24;
  --van-button-primary-border-color: #ee0a24;
}

.app {
  min-height: 100vh;
  padding-bottom: calc(var(--van-tabbar-height) + env(safe-area-inset-bottom));
}

.content {
  min-height: 100vh;
  padding-bottom: calc(var(--van-tabbar-height) + env(safe-area-inset-bottom));
}

// 适配 iPhone X+ 底部安全区域
.van-tabbar {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>