<template>
  <div class="tips">
    <van-nav-bar title="锦囊" fixed placeholder />
    <div class="content">
      <van-cell-group>
        <van-cell title="过年攻略" is-link />
        <van-cell title="礼仪指南" is-link />
        <van-cell title="祝福语大全" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
// 锦囊页面 - 提供过年建议和指南
</script>

<style scoped lang="scss">
.tips {
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    padding: 16px;
  }
}
</style>