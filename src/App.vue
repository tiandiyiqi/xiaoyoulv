<script setup lang="ts">
import { onLaunch, onShow, onHide, onBackPress } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

let firstBackTime = 0;
onBackPress(() => {
  if (!firstBackTime) {
    firstBackTime = Date.now();
    uni.showToast({
      title: "再按一次退出应用",
      icon: "none",
    });
    setTimeout(() => {
      firstBackTime = 0;
    }, 2000);
    return true;
  } else {
    if (Date.now() - firstBackTime > 2000) {
      firstBackTime = Date.now();
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
  }
});
</script>

<template>
  <view class="container">
    <router-view></router-view>
  </view>
</template>

<style lang="scss">
/* 引入图标字体 */
@import "@/static/fonts/iconfont.css";

/* 全局样式 */
page {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB",
    "Microsoft Yahei", sans-serif;
  background-color: #f5f5f5;
}

/* 通用布局类 */
.flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

/* 通用间距类 */
.m-0 {
  margin: 0;
}
.m-1 {
  margin: 10rpx;
}
.m-2 {
  margin: 20rpx;
}
.m-3 {
  margin: 30rpx;
}
.m-4 {
  margin: 40rpx;
}

.mt-0 {
  margin-top: 0;
}
.mt-1 {
  margin-top: 10rpx;
}
.mt-2 {
  margin-top: 20rpx;
}
.mt-3 {
  margin-top: 30rpx;
}
.mt-4 {
  margin-top: 40rpx;
}

.mb-0 {
  margin-bottom: 0;
}
.mb-1 {
  margin-bottom: 10rpx;
}
.mb-2 {
  margin-bottom: 20rpx;
}
.mb-3 {
  margin-bottom: 30rpx;
}
.mb-4 {
  margin-bottom: 40rpx;
}

.ml-0 {
  margin-left: 0;
}
.ml-1 {
  margin-left: 10rpx;
}
.ml-2 {
  margin-left: 20rpx;
}
.ml-3 {
  margin-left: 30rpx;
}
.ml-4 {
  margin-left: 40rpx;
}

.mr-0 {
  margin-right: 0;
}
.mr-1 {
  margin-right: 10rpx;
}
.mr-2 {
  margin-right: 20rpx;
}
.mr-3 {
  margin-right: 30rpx;
}
.mr-4 {
  margin-right: 40rpx;
}

.p-0 {
  padding: 0;
}
.p-1 {
  padding: 10rpx;
}
.p-2 {
  padding: 20rpx;
}
.p-3 {
  padding: 30rpx;
}
.p-4 {
  padding: 40rpx;
}

.pt-0 {
  padding-top: 0;
}
.pt-1 {
  padding-top: 10rpx;
}
.pt-2 {
  padding-top: 20rpx;
}
.pt-3 {
  padding-top: 30rpx;
}
.pt-4 {
  padding-top: 40rpx;
}

.pb-0 {
  padding-bottom: 0;
}
.pb-1 {
  padding-bottom: 10rpx;
}
.pb-2 {
  padding-bottom: 20rpx;
}
.pb-3 {
  padding-bottom: 30rpx;
}
.pb-4 {
  padding-bottom: 40rpx;
}

.pl-0 {
  padding-left: 0;
}
.pl-1 {
  padding-left: 10rpx;
}
.pl-2 {
  padding-left: 20rpx;
}
.pl-3 {
  padding-left: 30rpx;
}
.pl-4 {
  padding-left: 40rpx;
}

.pr-0 {
  padding-right: 0;
}
.pr-1 {
  padding-right: 10rpx;
}
.pr-2 {
  padding-right: 20rpx;
}
.pr-3 {
  padding-right: 30rpx;
}
.pr-4 {
  padding-right: 40rpx;
}

/* 文本类 */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-primary {
  color: #018eff;
}

.text-success {
  color: #67c23a;
}

.text-warning {
  color: #e6a23c;
}

.text-danger {
  color: #f56c6c;
}

.text-info {
  color: #909399;
}

.text-muted {
  color: #999;
}

/* 字体大小 */
.font-xs {
  font-size: 24rpx;
}

.font-sm {
  font-size: 28rpx;
}

.font-md {
  font-size: 32rpx;
}

.font-lg {
  font-size: 36rpx;
}

.font-xl {
  font-size: 40rpx;
}

/* 边框 */
.border {
  border: 1rpx solid #eee;
}

.border-top {
  border-top: 1rpx solid #eee;
}

.border-bottom {
  border-bottom: 1rpx solid #eee;
}

.border-left {
  border-left: 1rpx solid #eee;
}

.border-right {
  border-right: 1rpx solid #eee;
}

.rounded {
  border-radius: 8rpx;
}

.rounded-lg {
  border-radius: 16rpx;
}

.rounded-full {
  border-radius: 9999rpx;
}

/* 阴影 */
.shadow {
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
}

/* 容器 */
.container {
  width: 100%;
  min-height: 100vh;
}

.content-box {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
</style>
