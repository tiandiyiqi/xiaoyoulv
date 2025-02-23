<template>
  <view class="activity-detail">
    <image class="cover" :src="activity.cover" mode="aspectFill" />

    <view class="content">
      <view class="header">
        <view class="title">{{ activity.title }}</view>
        <view class="status" :class="activity.status">
          {{ getStatusText(activity.status) }}
        </view>
      </view>

      <view class="info-list">
        <view class="info-item">
          <text class="iconfont icon-time"></text>
          <text class="label">活动时间：</text>
          <text class="value">{{ activity.time }}</text>
        </view>
        <view class="info-item">
          <text class="iconfont icon-location"></text>
          <text class="label">活动地点：</text>
          <text class="value">{{ activity.location }}</text>
        </view>
        <view class="info-item">
          <text class="iconfont icon-user"></text>
          <text class="label">活动人数：</text>
          <text class="value"
            >{{ activity.participantCount }}/{{
              activity.maxParticipants
            }}人</text
          >
        </view>
        <view class="info-item">
          <text class="iconfont icon-money"></text>
          <text class="label">活动费用：</text>
          <text class="value">{{
            activity.fee ? `¥${activity.fee}` : "免费"
          }}</text>
        </view>
        <view class="info-item">
          <text class="iconfont icon-time"></text>
          <text class="label">报名截止：</text>
          <text class="value">{{ activity.deadline }}</text>
        </view>
        <view class="info-item">
          <text class="iconfont icon-phone"></text>
          <text class="label">联系方式：</text>
          <text class="value">{{ activity.contact }}</text>
        </view>
      </view>

      <view class="section">
        <view class="section-title">活动详情</view>
        <view class="description">{{ activity.description }}</view>
      </view>

      <view class="section">
        <view class="section-title">活动须知</view>
        <view class="notice">{{ activity.notice }}</view>
      </view>

      <view class="section">
        <view class="section-title">参与校友</view>
        <view v-if="activity.participants.length === 0" class="empty">
          暂无校友参与
        </view>
        <scroll-view v-else class="participant-list" scroll-x>
          <view
            v-for="participant in activity.participants"
            :key="participant.id"
            class="participant-item"
            @tap="handleViewProfile(participant)"
          >
            <image class="avatar" :src="participant.avatar" mode="aspectFill" />
            <text class="nickname">{{ participant.nickname }}</text>
          </view>
        </scroll-view>
      </view>

      <view class="section">
        <view class="section-title">评论区</view>
        <view v-if="activity.comments.length === 0" class="empty"
          >暂无评论</view
        >
        <view v-else class="comment-list">
          <view
            v-for="comment in activity.comments"
            :key="comment.id"
            class="comment-item"
          >
            <image class="avatar" :src="comment.avatar" mode="aspectFill" />
            <view class="content">
              <view class="info">
                <text class="nickname">{{ comment.nickname }}</text>
                <text class="time">{{ comment.createTime }}</text>
              </view>
              <view class="text">{{ comment.content }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="action-bar">
      <view class="left">
        <view class="action-item" @tap="handleShare">
          <text class="iconfont icon-share"></text>
          <text class="text">分享</text>
        </view>
        <view class="action-item" @tap="handleComment">
          <text class="iconfont icon-comment"></text>
          <text class="text">评论</text>
        </view>
      </view>
      <button
        class="join-btn"
        :class="{ disabled: !canJoin }"
        :disabled="!canJoin"
        @tap="handleJoin"
      >
        {{ getActionText() }}
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

// 用户状态管理
const userStore = useUserStore();

// 活动数据
const activity = ref({
  id: "1",
  cover: "/static/images/activity1.jpg",
  title: "2024届校友聚会",
  status: "upcoming" as "upcoming" | "ongoing" | "ended",
  time: "2024-03-01 14:00",
  location: "深圳市南山区",
  participantCount: 128,
  maxParticipants: 200,
  fee: 0,
  deadline: "2024-02-28",
  contact: "13800138000",
  description:
    "这是一场专属于2024届校友的聚会活动，让我们相聚在这里，分享各自的故事，畅谈未来的发展。",
  notice:
    "1. 请准时到场\n2. 请带好身份证\n3. 请遵守活动规则\n4. 如有特殊情况请提前联系主办方",
  participants: [
    {
      id: "1",
      nickname: "张三",
      avatar: "/static/avatar/default.png",
    },
  ],
  comments: [
    {
      id: "1",
      nickname: "李四",
      avatar: "/static/avatar/default.png",
      content: "期待参加这次活动！",
      createTime: "2024-02-23 14:30",
    },
  ],
});

// 是否可以参加
const canJoin = computed(() => {
  if (activity.value.status === "ended") return false;
  if (activity.value.participantCount >= activity.value.maxParticipants)
    return false;
  const now = new Date();
  const deadline = new Date(activity.value.deadline);
  return now <= deadline;
});

// 获取状态文本
const getStatusText = (status: "upcoming" | "ongoing" | "ended") => {
  const statusMap = {
    upcoming: "即将开始",
    ongoing: "进行中",
    ended: "已结束",
  };
  return statusMap[status];
};

// 获取操作文本
const getActionText = () => {
  if (activity.value.status === "ended") return "活动已结束";
  if (activity.value.participantCount >= activity.value.maxParticipants)
    return "名额已满";
  const now = new Date();
  const deadline = new Date(activity.value.deadline);
  if (now > deadline) return "报名已截止";
  return "立即报名";
};

// 查看用户主页
const handleViewProfile = (user: any) => {
  uni.navigateTo({
    url: `/pages/profile/index?id=${user.id}`,
  });
};

// 分享
const handleShare = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

// 评论
const handleComment = () => {
  uni.showToast({
    title: "评论功能开发中",
    icon: "none",
  });
};

// 报名
const handleJoin = () => {
  if (!canJoin.value) return;

  uni.showModal({
    title: "确认报名",
    content: "是否确认报名参加该活动？",
    success: (res) => {
      if (res.confirm) {
        // TODO: 报名活动
        uni.showToast({
          title: "报名成功",
          icon: "success",
        });
      }
    },
  });
};

onMounted(() => {
  // TODO: 获取活动详情
});
</script>

<style lang="scss">
.activity-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .cover {
    width: 100%;
    height: 400rpx;
  }

  .content {
    margin-top: -40rpx;
    border-radius: 40rpx 40rpx 0 0;
    background-color: #fff;
    padding: 40rpx 30rpx;

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 40rpx;

      .title {
        flex: 1;
        font-size: 36rpx;
        color: #333;
        font-weight: bold;
        margin-right: 20rpx;
      }

      .status {
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

    .info-list {
      background-color: #f5f5f5;
      border-radius: 16rpx;
      padding: 20rpx;
      margin-bottom: 40rpx;

      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .iconfont {
          font-size: 32rpx;
          color: #666;
          margin-right: 10rpx;
        }

        .label {
          font-size: 28rpx;
          color: #666;
          margin-right: 10rpx;
        }

        .value {
          font-size: 28rpx;
          color: #333;
        }
      }
    }

    .section {
      margin-bottom: 40rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .section-title {
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 20rpx;
      }

      .description,
      .notice {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
      }

      .empty {
        padding: 40rpx 0;
        text-align: center;
        color: #999;
        font-size: 28rpx;
      }

      .participant-list {
        white-space: nowrap;

        .participant-item {
          display: inline-block;
          margin-right: 30rpx;

          &:last-child {
            margin-right: 0;
          }

          .avatar {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
            margin-bottom: 10rpx;
          }

          .nickname {
            width: 100rpx;
            font-size: 24rpx;
            color: #666;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .comment-list {
        .comment-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30rpx;

          &:last-child {
            margin-bottom: 0;
          }

          .avatar {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }

          .content {
            flex: 1;

            .info {
              display: flex;
              align-items: center;
              margin-bottom: 10rpx;

              .nickname {
                font-size: 28rpx;
                color: #333;
                font-weight: bold;
                margin-right: 20rpx;
              }

              .time {
                font-size: 24rpx;
                color: #999;
              }
            }

            .text {
              font-size: 28rpx;
              color: #666;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }

  .action-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;

    .left {
      display: flex;
      align-items: center;

      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40rpx;

        &:last-child {
          margin-right: 0;
        }

        .iconfont {
          font-size: 40rpx;
          color: #666;
          margin-bottom: 4rpx;
        }

        .text {
          font-size: 24rpx;
          color: #666;
        }
      }
    }

    .join-btn {
      width: 240rpx;
      height: 72rpx;
      background-color: #018eff;
      color: #fff;
      font-size: 28rpx;
      border-radius: 36rpx;

      &.disabled {
        background-color: #ccc;
      }

      &:active {
        opacity: 0.8;
      }

      &::after {
        display: none;
      }
    }
  }
}
</style>
