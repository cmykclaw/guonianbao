<template>
  <div class="relatives">
    <van-nav-bar title="亲戚" fixed placeholder />
    <div class="content">
      <van-empty description="暂无亲戚信息">
        <van-button round type="primary" class="bottom-button">添加亲戚</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
// 亲戚页面 - 管理亲戚关系网络
</script>

<style scoped lang="scss">
.relatives {
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    padding: 16px;
  }

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>