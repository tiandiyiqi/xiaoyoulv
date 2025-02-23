<template>
  <view class="mine">
    <view class="header">
      <view class="user-info">
        <image class="avatar" :src="userInfo?.avatar" mode="aspectFill" />
        <view class="info">
          <text class="nickname">{{ userInfo?.nickname || "未设置昵称" }}</text>
          <text class="username">{{ userInfo?.username }}</text>
        </view>
      </view>
      <view class="edit-btn" @tap="handleEditProfile">
        <text class="iconfont icon-edit"></text>
        编辑资料
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        border: 4rpx solid #fff;
        margin-right: 20rpx;
      }

      .info {
        .nickname {
          font-size: 36rpx;
          color: #fff;
          font-weight: bold;
          margin-bottom: 10rpx;
        }

        .username {
          font-size: 28rpx;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    .edit-btn {
      align-self: flex-end;
      display: flex;
      align-items: center;
      padding: 12rpx 24rpx;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 32rpx;

      .iconfont {
        font-size: 28rpx;
        color: #fff;
        margin-right: 8rpx;
      }

      text {
        font-size: 28rpx;
        color: #fff;
      }
    }
  }

  .stats {
    margin: -60rpx 40rpx 0;
    padding: 40rpx;
    background-color: #fff;
    border-radius: 16rpx;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .count {
        font-size: 36rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .label {
        font-size: 28rpx;
        color: #999;
      }
    }
  }

  .menu {
    margin: 20rpx;
    border-radius: 16rpx;
    background-color: #fff;
    overflow: hidden;

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx;
      border-bottom: 1rpx solid #eee;

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
        }

        .label {
          font-size: 32rpx;
          color: #333;
        }
      }

      .iconfont {
        font-size: 32rpx;
        color: #999;
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
  }
}
</style>
