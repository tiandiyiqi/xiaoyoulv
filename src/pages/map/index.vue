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

    <view class="map-container">
      <map
        id="map"
        :latitude="mapState.latitude"
        :longitude="mapState.longitude"
        :markers="markers"
        :scale="mapState.scale"
        :show-location="true"
        :enable-poi="true"
        :enable-traffic="false"
        :enable-satellite="false"
        :enable-3D="false"
        @markertap="handleMarkerTap"
        @regionchange="handleRegionChange"
      ></map>
    </view>

    <view class="marker-selector">
      <view
        class="marker-item"
        :class="{ active: activeMarker === 'location' }"
        @tap="handleLocateUser"
      >
        <image
          class="marker-icon"
          src="/static/markers/default.svg"
          mode="aspectFit"
        />
        <text class="marker-text">定位</text>
      </view>
      <view
        class="marker-item"
        :class="{ active: activeMarker === 'alumni' }"
        @tap="handleShowAlumni"
      >
        <image
          class="marker-icon"
          src="/static/markers/alumni.svg"
          mode="aspectFit"
        />
        <text class="marker-text">校友</text>
      </view>
      <view
        class="marker-item"
        :class="{ active: activeMarker === 'company' }"
        @tap="handleShowCompany"
      >
        <image
          class="marker-icon"
          src="/static/markers/company.svg"
          mode="aspectFit"
        />
        <text class="marker-text">企业</text>
      </view>
      <view
        class="marker-item"
        :class="{ active: activeMarker === 'activity' }"
        @tap="handleShowActivity"
      >
        <image
          class="marker-icon"
          src="/static/markers/activity.svg"
          mode="aspectFit"
        />
        <text class="marker-text">活动</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { MAP_CONFIG } from "@/config";
import { getLocation } from "@/utils/location";

// 用户状态管理
const userStore = useUserStore();

// 地图上下文
const mapContext = ref<any>(null);

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
    title: "陈明宇",
    iconPath: "/static/markers/alumni.svg",
    width: 40,
    height: 40,
    anchor: {
      x: 0.5,
      y: 1,
    },
    label: {
      content: "陈明宇",
      color: "#333",
      fontSize: 12,
      bgColor: "#fff",
      padding: 3,
      borderRadius: 4,
      anchorX: 0,
      anchorY: -45,
    },
    customCallout: {
      display: "ALWAYS",
      anchorX: 0,
      anchorY: 0,
    },
  },
  {
    id: 2,
    latitude: 22.53286,
    longitude: 114.06956,
    title: "王思远",
    iconPath: "/static/markers/alumni.svg",
    width: 40,
    height: 40,
    anchor: {
      x: 0.5,
      y: 1,
    },
    label: {
      content: "王思远",
      color: "#333",
      fontSize: 12,
      bgColor: "#fff",
      padding: 3,
      borderRadius: 4,
      anchorX: 0,
      anchorY: -45,
    },
    customCallout: {
      display: "ALWAYS",
      anchorX: 0,
      anchorY: 0,
    },
  },
  {
    id: 3,
    latitude: 22.55286,
    longitude: 114.04956,
    title: "林雨晴",
    iconPath: "/static/markers/alumni.svg",
    width: 40,
    height: 40,
    anchor: {
      x: 0.5,
      y: 1,
    },
    label: {
      content: "林雨晴",
      color: "#333",
      fontSize: 12,
      bgColor: "#fff",
      padding: 3,
      borderRadius: 4,
      anchorX: 0,
      anchorY: -45,
    },
    customCallout: {
      display: "ALWAYS",
      anchorX: 0,
      anchorY: 0,
    },
  },
]);

// 当前激活的标记类型
const activeMarker = ref("alumni");

// 处理图片加载错误
const handleImageError = (e: any) => {
  const target = e.target;
  if (target && target.src) {
    // 设置默认图片
    if (target.src.includes("avatar")) {
      target.src = "/static/avatar/default.png";
    } else if (target.src.includes("tabbar")) {
      target.src = "/static/tabbar/home.png";
    } else if (target.src.includes("markers")) {
      target.src = "/static/markers/default.png";
    } else {
      target.src = "/static/images/default.jpg";
    }
  }
};

// 初始化地图SDK
const initMapSDK = () => {
  // 获取用户位置
  handleLocateUser();
};

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

// 移动地图到指定位置
const moveToLocation = (latitude: number, longitude: number) => {
  if (!mapContext.value) {
    mapContext.value = uni.createMapContext("map");
  }

  mapContext.value.moveToLocation({
    latitude,
    longitude,
    success: () => {
      console.log("地图移动成功");
    },
    fail: (error: any) => {
      console.error("地图移动失败:", error);
    },
  });
};

// 定位用户
const handleLocateUser = () => {
  activeMarker.value = "location";
  // 显示加载提示
  uni.showLoading({
    title: "定位中...",
  });

  // 先尝试使用 uni-app 的定位 API
  uni.getLocation({
    type: "gcj02",
    isHighAccuracy: true,
    success: (res: UniApp.GetLocationSuccess) => {
      console.log("定位成功:", res);
      if (
        typeof res.latitude === "number" &&
        typeof res.longitude === "number"
      ) {
        // 更新地图中心点
        mapState.latitude = res.latitude;
        mapState.longitude = res.longitude;
        mapState.scale = 14;

        // 移动地图到当前位置
        moveToLocation(res.latitude, res.longitude);

        // 添加当前位置标记
        const currentLocationMarker = {
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          title: "当前位置",
          iconPath: "/static/markers/default.svg",
          width: 40,
          height: 40,
          anchor: {
            x: 0.5,
            y: 1,
          },
          label: {
            content: "当前位置",
            color: "#333",
            fontSize: 12,
            bgColor: "#fff",
            padding: 3,
            borderRadius: 4,
            anchorX: 0,
            anchorY: -45,
          },
          customCallout: {
            display: "ALWAYS",
            anchorX: 0,
            anchorY: 0,
          },
        };

        // 更新标记点列表
        markers.value = [
          currentLocationMarker,
          ...markers.value.filter((m) => m.id !== 0),
        ];

        // 隐藏加载提示
        uni.hideLoading();
      }
    },
    fail: (error) => {
      console.error("uni-app定位失败:", error);
      // 如果uni-app定位失败，尝试使用浏览器定位
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("浏览器定位成功:", position);
            mapState.latitude = position.coords.latitude;
            mapState.longitude = position.coords.longitude;
            mapState.scale = 14;

            // 添加当前位置标记
            const currentLocationMarker = {
              id: 0,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              title: "当前位置",
              iconPath: "/static/markers/default.svg",
              width: 40,
              height: 40,
              anchor: {
                x: 0.5,
                y: 1,
              },
              label: {
                content: "当前位置",
                color: "#333",
                fontSize: 12,
                bgColor: "#fff",
                padding: 3,
                borderRadius: 4,
                anchorX: 0,
                anchorY: -45,
              },
              customCallout: {
                display: "ALWAYS",
                anchorX: 0,
                anchorY: 0,
              },
            };

            // 更新标记点列表
            markers.value = [
              currentLocationMarker,
              ...markers.value.filter((m) => m.id !== 0),
            ];

            // 隐藏加载提示
            uni.hideLoading();
          },
          (error) => {
            console.error("浏览器定位失败:", error);
            uni.showModal({
              title: "提示",
              content: "获取位置失败，请确保已允许浏览器获取位置权限",
              showCancel: false,
            });
            // 隐藏加载提示
            uni.hideLoading();
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        // 隐藏加载提示
        uni.hideLoading();
      }
    },
  });
};

// 显示校友
const handleShowAlumni = () => {
  activeMarker.value = "alumni";
  // 更新所有标记点为校友图标
  markers.value = markers.value.map((marker) => ({
    ...marker,
    iconPath:
      marker.id === 0
        ? "/static/markers/default.svg"
        : "/static/markers/alumni.svg",
  }));
};

// 显示企业
const handleShowCompany = () => {
  activeMarker.value = "company";
  // 更新所有标记点为企业图标
  markers.value = markers.value.map((marker) => ({
    ...marker,
    iconPath:
      marker.id === 0
        ? "/static/markers/default.svg"
        : "/static/markers/company.svg",
  }));
};

// 显示活动
const handleShowActivity = () => {
  activeMarker.value = "activity";
  // 更新所有标记点为活动图标
  markers.value = markers.value.map((marker) => ({
    ...marker,
    iconPath:
      marker.id === 0
        ? "/static/markers/default.svg"
        : "/static/markers/activity.svg",
  }));
};

onMounted(() => {
  // 初始化地图SDK
  initMapSDK();
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    map {
      width: 100%;
      height: 100%;
    }
  }

  .marker-selector {
    position: absolute;
    right: 30rpx;
    bottom: 200rpx;
    z-index: 1;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .marker-item {
      display: flex;
      align-items: center;
      padding: 10rpx;
      border-radius: 8rpx;
      transition: all 0.3s;
      cursor: pointer;

      &.active {
        background-color: #e6f3ff;
      }

      .marker-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }

      .marker-text {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}
</style>
