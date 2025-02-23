<template>
  <view class="map">
    <view class="search-box">
      <view class="input-box">
        <text class="iconfont icon-search"></text>
        <input
          class="input"
          type="text"
          v-model="keyword"
          placeholder="搜索校友、企业"
          placeholder-class="placeholder"
          @confirm="handleSearch"
        />
      </view>
      <view class="filter-btn" @tap="handleShowFilter">
        <text class="iconfont icon-filter"></text>
        <text class="text">筛选</text>
      </view>
    </view>

    <map
      class="map-container"
      :latitude="mapState.latitude"
      :longitude="mapState.longitude"
      :markers="markers"
      :scale="mapState.scale"
      :show-location="true"
      @markertap="handleMarkerTap"
      @regionchange="handleRegionChange"
    ></map>

    <view class="toolbar">
      <view class="tool-item" @tap="handleLocateUser">
        <text class="iconfont icon-location"></text>
        <text class="label">定位</text>
      </view>
      <view class="tool-item" @tap="handleShowAlumni">
        <text class="iconfont icon-user"></text>
        <text class="label">校友</text>
      </view>
      <view class="tool-item" @tap="handleShowCompany">
        <text class="iconfont icon-company"></text>
        <text class="label">企业</text>
      </view>
      <view class="tool-item" @tap="handleShowActivity">
        <text class="iconfont icon-activity"></text>
        <text class="label">活动</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

// 用户状态管理
const userStore = useUserStore();

// 搜索关键词
const keyword = ref("");

// 地图状态
const mapState = reactive({
  latitude: 22.54286, // 深圳
  longitude: 114.05956,
  scale: 12,
});

// 标记点数据
const markers = ref([
  {
    id: 1,
    latitude: 22.54286,
    longitude: 114.05956,
    title: "张三",
    iconPath: "/static/markers/alumni.png",
    width: 32,
    height: 32,
  },
]);

// 搜索
const handleSearch = () => {
  if (!keyword.value) return;

  // TODO: 实现搜索功能
  uni.showToast({
    title: "搜索功能开发中",
    icon: "none",
  });
};

// 显示筛选
const handleShowFilter = () => {
  uni.showToast({
    title: "筛选功能开发中",
    icon: "none",
  });
};

// 标记点点击
const handleMarkerTap = (e: any) => {
  const marker = markers.value.find((item) => item.id === e.markerId);
  if (marker) {
    uni.showToast({
      title: `点击了${marker.title}`,
      icon: "none",
    });
  }
};

// 地图区域变化
const handleRegionChange = (e: any) => {
  // TODO: 根据地图区域加载数据
  console.log("地图区域变化", e);
};

// 定位用户
const handleLocateUser = () => {
  uni.getLocation({
    type: "gcj02",
    success: (res) => {
      mapState.latitude = res.latitude;
      mapState.longitude = res.longitude;
      mapState.scale = 14;
    },
    fail: () => {
      uni.showToast({
        title: "获取位置失败",
        icon: "none",
      });
    },
  });
};

// 显示校友
const handleShowAlumni = () => {
  // TODO: 加载并显示校友标记点
  uni.showToast({
    title: "校友标记功能开发中",
    icon: "none",
  });
};

// 显示企业
const handleShowCompany = () => {
  // TODO: 加载并显示企业标记点
  uni.showToast({
    title: "企业标记功能开发中",
    icon: "none",
  });
};

// 显示活动
const handleShowActivity = () => {
  // TODO: 加载并显示活动标记点
  uni.showToast({
    title: "活动标记功能开发中",
    icon: "none",
  });
};

onMounted(() => {
  // 获取用户位置
  handleLocateUser();
});
</script>

<style lang="scss">
.map {
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;

  .search-box {
    position: absolute;
    top: 20rpx;
    left: 30rpx;
    right: 30rpx;
    z-index: 1;
    display: flex;
    align-items: center;

    .input-box {
      flex: 1;
      height: 72rpx;
      background-color: #fff;
      border-radius: 36rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      margin-right: 20rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

      .iconfont {
        font-size: 32rpx;
        color: #999;
        margin-right: 10rpx;
      }

      .input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
      }

      .placeholder {
        color: #999;
      }
    }

    .filter-btn {
      width: 72rpx;
      height: 72rpx;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

      .iconfont {
        font-size: 32rpx;
        color: #666;
      }

      .text {
        font-size: 20rpx;
        color: #666;
        margin-top: 2rpx;
      }
    }
  }

  .map-container {
    width: 100%;
    height: 100%;
  }

  .toolbar {
    position: absolute;
    right: 30rpx;
    bottom: 160rpx;
    z-index: 1;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

    .tool-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .iconfont {
        font-size: 48rpx;
        color: #666;
        margin-bottom: 4rpx;
      }

      .label {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}
</style>
