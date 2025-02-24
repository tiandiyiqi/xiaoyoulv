<script>
let firstBackTime = 0;

export default {
  onLaunch() {
    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
  onBackPress() {
    const currentTime = Date.now();
    if (!firstBackTime || currentTime - firstBackTime > 2000) {
      firstBackTime = currentTime;
      uni.showToast({
        title: "再按一次退出应用",
        icon: "none",
      });
      setTimeout(() => {
        firstBackTime = 0;
      }, 2000);
      return true;
    }
    return false;
  },
};
</script>

<template>
  <view class="container">
    <page-meta>
      <navigation-bar />
    </page-meta>
  </view>
</template>

<style lang="scss">
page {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB",
    "Microsoft Yahei", sans-serif;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  min-height: 100vh;
}
</style>
