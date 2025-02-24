<template>
  <view class="activity">
    <view class="search-box">
      <view class="input-box">
        <text class="iconfont icon-search"></text>
        <input
          class="input"
          type="text"
          v-model="keyword"
          placeholder="搜索活动"
          placeholder-class="placeholder"
          @confirm="handleSearch"
        />
      </view>
      <view class="filter-btn" @tap="handleShowFilter">
        <text class="iconfont icon-filter"></text>
        <text class="text">筛选</text>
      </view>
    </view>

    <scroll-view
      class="activity-list"
      scroll-y
      @scrolltolower="handleLoadMore"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
    >
      <view v-if="activities.length === 0" class="empty">
        <text>暂无活动</text>
      </view>
      <view v-else class="list">
        <view
          v-for="activity in activities"
          :key="activity.id"
          class="activity-item"
          @tap="handleViewActivity(activity)"
        >
          <image class="cover" :src="activity.cover" mode="aspectFill" />
          <view class="content">
            <view class="title">{{ activity.title }}</view>
            <view class="info">
              <text class="time">{{ activity.time }}</text>
              <text class="location">{{ activity.location }}</text>
            </view>
            <view class="stats">
              <view class="stat-item">
                <text class="count">{{ activity.participantCount }}</text>
                <text class="label">参与</text>
              </view>
              <view class="stat-item">
                <text class="count">{{ activity.interestedCount }}</text>
                <text class="label">感兴趣</text>
              </view>
            </view>
            <view class="status" :class="activity.status">
              {{ getStatusText(activity.status) }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="fab-button" @tap="handleCreateActivity">
      <text class="iconfont icon-add"></text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { getEvents } from "@/api";
import type { Event } from "@/api";

// 用户状态管理
const userStore = useUserStore();

// 搜索关键词
const keyword = ref("");

// 活动列表
const activities = ref<Event[]>([]);

// 刷新状态
const refreshing = ref(false);

// 搜索
const handleSearch = async () => {
  if (!keyword.value) return;

  try {
    const { data } = await getEvents({ keyword: keyword.value });
    activities.value = data;
  } catch (error) {
    uni.showToast({
      title: "搜索失败",
      icon: "none",
    });
  }
};

// 显示筛选
const handleShowFilter = () => {
  uni.showToast({
    title: "筛选功能开发中",
    icon: "none",
  });
};

// 查看活动详情
const handleViewActivity = (activity: Event) => {
  uni.navigateTo({
    url: `/pages/activity/detail/index?id=${activity.id}`,
  });
};

// 创建活动
const handleCreateActivity = () => {
  uni.navigateTo({
    url: "/pages/activity/create/index",
  });
};

// 加载更多
const handleLoadMore = () => {
  // TODO: 加载更多数据
  uni.showToast({
    title: "加载更多功能开发中",
    icon: "none",
  });
};

// 刷新
const handleRefresh = async () => {
  refreshing.value = true;
  try {
    const { data } = await getEvents();
    activities.value = data;
    uni.showToast({
      title: "刷新成功",
      icon: "success",
    });
  } catch (error) {
    uni.showToast({
      title: "刷新失败",
      icon: "none",
    });
  } finally {
    refreshing.value = false;
  }
};

// 获取状态文本
const getStatusText = (status: Event["status"]) => {
  const statusMap = {
    upcoming: "即将开始",
    ongoing: "进行中",
    ended: "已结束",
  };
  return statusMap[status];
};

onMounted(async () => {
  try {
    const { data } = await getEvents();
    activities.value = data;
  } catch (error) {
    console.error("获取活动列表失败:", error);
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  }
});
</script>

<style lang="scss">
.activity {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .search-box {
    padding: 20rpx 30rpx;
    background-color: #fff;
    display: flex;
    align-items: center;

    .input-box {
      flex: 1;
      height: 72rpx;
      background-color: #f5f5f5;
      border-radius: 36rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      margin-right: 20rpx;

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
      background-color: #f5f5f5;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

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

  .activity-list {
    height: calc(100vh - 112rpx);

    .empty {
      padding: 40rpx 0;
      text-align: center;
      color: #999;
    }

    .list {
      padding: 20rpx;

      .activity-item {
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 16rpx;
        overflow: hidden;

        .cover {
          width: 100%;
          height: 300rpx;
        }

        .content {
          padding: 20rpx;
          position: relative;

          .title {
            font-size: 32rpx;
            color: #333;
            font-weight: bold;
            margin-bottom: 10rpx;
          }

          .info {
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;

            .time {
              font-size: 24rpx;
              color: #666;
              margin-right: 20rpx;
            }

            .location {
              font-size: 24rpx;
              color: #666;
            }
          }

          .stats {
            display: flex;
            align-items: center;

            .stat-item {
              display: flex;
              align-items: center;
              margin-right: 30rpx;

              .count {
                font-size: 28rpx;
                color: #333;
                font-weight: bold;
                margin-right: 8rpx;
              }

              .label {
                font-size: 24rpx;
                color: #999;
              }
            }
          }

          .status {
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            padding: 4rpx 12rpx;
            border-radius: 4rpx;
            font-size: 24rpx;

            &.upcoming {
              background-color: #e6f7ff;
              color: #1890ff;
            }

            &.ongoing {
              background-color: #f6ffed;
              color: #52c41a;
            }

            &.ended {
              background-color: #f5f5f5;
              color: #999;
            }
          }
        }
      }
    }
  }

  .fab-button {
    position: fixed;
    right: 40rpx;
    bottom: 140rpx;
    width: 100rpx;
    height: 100rpx;
    background-color: #018eff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);

    .iconfont {
      font-size: 48rpx;
      color: #fff;
    }
  }
}
</style>
