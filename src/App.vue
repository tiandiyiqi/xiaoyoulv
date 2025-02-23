<script setup lang="ts">
let firstBackTime = 0;
</script>

<template>
  <view class="container">
    <router-view></router-view>
  </view>
</template>

<style lang="scss">
/*每个页面公共css */
.uni-row {
  flex-direction: row;
}

.uni-column {
  flex-direction: column;
}

.container {
  width: 100%;
  min-height: 100vh;
}
</style>
