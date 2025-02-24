<template>
  <view class="mine">
    <view class="header">
      <view class="user-info">
        <image class="avatar" :src="userInfo?.avatar" mode="aspectFill" />
        <view class="info">
          <text class="nickname">{{ userInfo?.nickname || "未设置昵称" }}</text>
          <text class="username">{{ userInfo?.username }}</text>
        </view>
        <view class="edit-btn" @tap="handleEditProfile">
          <text class="iconfont icon-edit"></text>
          编辑资料
        </view>
      </view>
    </view>

    <view class="stats">
      <view class="stat-item" @tap="handleViewFollowers">
        <text class="count">{{ stats.followers }}</text>
        <text class="label">关注者</text>
      </view>
      <view class="stat-item" @tap="handleViewFollowing">
        <text class="count">{{ stats.following }}</text>
        <text class="label">关注</text>
      </view>
      <view class="stat-item" @tap="handleViewPosts">
        <text class="count">{{ stats.posts }}</text>
        <text class="label">动态</text>
      </view>
    </view>

    <view class="menu">
      <view class="menu-item" @tap="handleViewEducation">
        <view class="left">
          <text class="iconfont icon-education"></text>
          <text class="label">教育经历</text>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>

      <view class="menu-item" @tap="handleViewWork">
        <view class="left">
          <text class="iconfont icon-work"></text>
          <text class="label">工作经历</text>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>

      <view class="menu-item" @tap="handleViewLocation">
        <view class="left">
          <text class="iconfont icon-location"></text>
          <text class="label">我的位置</text>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>

      <view class="menu-item" @tap="handleViewActivity">
        <view class="left">
          <text class="iconfont icon-activity"></text>
          <text class="label">我的活动</text>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>

      <view class="menu-item" @tap="handleViewResource">
        <view class="left">
          <text class="iconfont icon-resource"></text>
          <text class="label">我的资源</text>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>

      <view class="menu-item" @tap="handleViewSettings">
        <view class="left">
          <text class="iconfont icon-settings"></text>
          <text class="label">设置</text>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>
    </view>

    <button class="logout-btn" @tap="handleLogout">退出登录</button>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";

// 用户状态管理
const userStore = useUserStore();

// 用户信息
const userInfo = computed(() => userStore.getUserInfo);

// 统计数据
const stats = reactive({
  followers: 0,
  following: 0,
  posts: 0,
});

// 编辑资料
const handleEditProfile = () => {
  uni.navigateTo({
    url: "/pages/user/profile/index",
  });
};

// 查看关注者
const handleViewFollowers = () => {
  uni.showToast({
    title: "关注者功能开发中",
    icon: "none",
  });
};

// 查看关注
const handleViewFollowing = () => {
  uni.showToast({
    title: "关注功能开发中",
    icon: "none",
  });
};

// 查看动态
const handleViewPosts = () => {
  uni.showToast({
    title: "动态功能开发中",
    icon: "none",
  });
};

// 查看教育经历
const handleViewEducation = () => {
  uni.navigateTo({
    url: "/pages/user/education/list",
  });
};

// 查看工作经历
const handleViewWork = () => {
  uni.navigateTo({
    url: "/pages/user/work/list",
  });
};

// 查看位置
const handleViewLocation = () => {
  uni.navigateTo({
    url: "/pages/user/location/index",
  });
};

// 查看活动
const handleViewActivity = () => {
  uni.navigateTo({
    url: "/pages/user/activity/list",
  });
};

// 查看资源
const handleViewResource = () => {
  uni.navigateTo({
    url: "/pages/user/resource/list",
  });
};

// 查看设置
const handleViewSettings = () => {
  uni.navigateTo({
    url: "/pages/user/settings/index",
  });
};

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        userStore.logout();
      }
    },
  });
};

// 获取统计数据
const getStats = async () => {
  try {
    // TODO: 调用获取统计数据接口
    const res = await new Promise<{
      followers: number;
      following: number;
      posts: number;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          followers: 128,
          following: 256,
          posts: 64,
        });
      }, 1000);
    });

    Object.assign(stats, res);
  } catch (error) {
    console.error("获取统计数据失败", error);
  }
};

onMounted(() => {
  getStats();
});
</script>

<style lang="scss">
.mine {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;

  .header {
    height: 300rpx;
    background-color: #018eff;
    padding: 40rpx;
    position: relative;
    border-radius: 0 0 30rpx 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(1, 142, 255, 0.2);

    .user-info {
      display: flex;
      align-items: center;
      margin-top: 40rpx;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        border: 4rpx solid rgba(255, 255, 255, 0.8);
        margin-right: 20rpx;
        box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
      }

      .info {
        flex: 1;

        .nickname {
          font-size: 36rpx;
          color: #fff;
          font-weight: bold;
          margin-bottom: 10rpx;
          text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
        }

        .username {
          font-size: 28rpx;
          color: rgba(255, 255, 255, 0.9);
        }
      }

      .edit-btn {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 30rpx;
        padding: 12rpx 24rpx;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 24rpx;
        backdrop-filter: blur(10px);
        transition: all 0.3s;

        &:active {
          transform: scale(0.95);
          background-color: rgba(255, 255, 255, 0.3);
        }

        .iconfont {
          margin-right: 6rpx;
          font-size: 28rpx;
        }
      }
    }
  }

  .stats {
    margin: 20rpx;
    padding: 30rpx 20rpx;
    background-color: #fff;
    border-radius: 16rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    position: relative;
    margin-top: -60rpx;

    .stat-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      &:not(:last-child)::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2rpx;
        height: 40rpx;
        background-color: #eee;
      }

      .count {
        font-size: 40rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .label {
        font-size: 28rpx;
        color: #666;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  .menu {
    margin: 30rpx 20rpx;
    border-radius: 16rpx;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      border-bottom: 1rpx solid #f5f5f5;
      transition: all 0.3s;

      &:active {
        background-color: #f9f9f9;
      }

      &:last-child {
        border-bottom: none;
      }

      .left {
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 40rpx;
          color: #018eff;
          margin-right: 20rpx;
          opacity: 0.9;
        }

        .label {
          font-size: 32rpx;
          color: #333;
        }
      }

      .iconfont {
        font-size: 32rpx;
        color: #ccc;
      }
    }
  }

  .logout-btn {
    margin: 60rpx 40rpx;
    height: 90rpx;
    background-color: #fff;
    color: #f56c6c;
    font-size: 32rpx;
    border-radius: 45rpx;
    box-shadow: 0 4rpx 12rpx rgba(245, 108, 108, 0.1);
    transition: all 0.3s;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2rpx 6rpx rgba(245, 108, 108, 0.1);
    }
  }
}
</style>
