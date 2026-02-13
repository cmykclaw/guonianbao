<template>
  <div class="gift-records">
    <van-nav-bar title="礼薄" fixed placeholder />
    <div class="content">
      <van-empty description="暂无礼金记录">
        <van-button round type="primary" class="bottom-button">添加记录</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
// 礼薄页面 - 管理送礼/收礼记录
</script>

<style scoped lang="scss">
.gift-records {
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