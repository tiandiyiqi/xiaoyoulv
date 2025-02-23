<template>
  <view class="resource-detail">
    <view class="header">
      <view class="user-info">
        <image class="avatar" :src="resource.avatar" mode="aspectFill" />
        <view class="info">
          <text class="nickname">{{ resource.nickname }}</text>
          <text class="time">{{ resource.createTime }}</text>
        </view>
      </view>
      <view class="type" :class="resource.type">
        {{ getTypeText(resource.type) }}
      </view>
    </view>

    <view class="content">
      <view class="title">{{ resource.title }}</view>
      <view class="description">{{ resource.description }}</view>

      <view v-if="resource.type === 'job'" class="section">
        <view class="section-title">职位要求</view>
        <view class="text">{{ resource.requirement }}</view>
      </view>

      <view v-if="resource.type === 'project'" class="section">
        <view class="section-title">项目预算</view>
        <view class="text">¥{{ resource.budget }}</view>
      </view>

      <view v-if="resource.type === 'document'" class="section">
        <view class="section-title">文档附件</view>
        <view class="file" @tap="handleDownload">
          <text class="iconfont icon-file"></text>
          <text class="name">{{ resource.fileName }}</text>
          <text class="size">{{ resource.fileSize }}</text>
        </view>
      </view>

      <view class="section">
        <view class="section-title">标签</view>
        <view class="tags">
          <text
            v-for="(tag, index) in resource.tags"
            :key="index"
            class="tag"
            >{{ tag }}</text
          >
        </view>
      </view>

      <view class="section">
        <view class="section-title">联系方式</view>
        <view class="contact">{{ resource.contact }}</view>
      </view>
    </view>

    <view class="stats">
      <view class="stat-item">
        <text class="iconfont icon-view"></text>
        <text class="count">{{ resource.viewCount }}</text>
      </view>
      <view class="stat-item" @tap="handleLike">
        <text
          class="iconfont icon-like"
          :class="{ active: resource.isLiked }"
        ></text>
        <text class="count">{{ resource.likeCount }}</text>
      </view>
      <view class="stat-item" @tap="handleComment">
        <text class="iconfont icon-comment"></text>
        <text class="count">{{ resource.commentCount }}</text>
      </view>
      <view class="stat-item" @tap="handleShare">
        <text class="iconfont icon-share"></text>
        <text class="count">{{ resource.shareCount }}</text>
      </view>
    </view>

    <view class="section">
      <view class="section-title">评论区</view>
      <view v-if="resource.comments.length === 0" class="empty">暂无评论</view>
      <view v-else class="comment-list">
        <view
          v-for="comment in resource.comments"
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

    <view class="action-bar">
      <input
        class="input"
        type="text"
        v-model="commentText"
        placeholder="说点什么..."
        placeholder-class="placeholder"
        @confirm="handleSubmitComment"
      />
      <button
        class="action-btn"
        :class="{ disabled: !canAction }"
        :disabled="!canAction"
        @tap="handleAction"
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

// 资源数据
const resource = ref({
  id: "1",
  nickname: "张三",
  avatar: "/static/avatar/default.png",
  createTime: "2024-02-23 14:30",
  type: "job" as "job" | "project" | "experience" | "document",
  title: "前端开发工程师",
  description:
    "我们正在寻找一位优秀的前端开发工程师加入我们的团队，负责公司核心产品的前端开发工作。",
  requirement:
    "1. 熟练掌握 HTML、CSS、JavaScript\n2. 熟悉 Vue3、TypeScript\n3. 有小程序开发经验\n4. 有良好的团队协作能力",
  budget: "",
  file: "",
  fileName: "",
  fileSize: "",
  tags: ["前端开发", "Vue3", "TypeScript"],
  contact: "13800138000",
  viewCount: 256,
  likeCount: 32,
  commentCount: 8,
  shareCount: 16,
  isLiked: false,
  comments: [
    {
      id: "1",
      nickname: "李四",
      avatar: "/static/avatar/default.png",
      content: "这个机会不错，请问可以远程工作吗？",
      createTime: "2024-02-23 14:35",
    },
  ],
});

// 评论文本
const commentText = ref("");

// 是否可以操作
const canAction = computed(() => {
  return true; // TODO: 根据实际情况判断
});

// 获取类型文本
const getTypeText = (type: "job" | "project" | "experience" | "document") => {
  const typeMap = {
    job: "招聘",
    project: "项目",
    experience: "经验",
    document: "文档",
  };
  return typeMap[type];
};

// 获取操作文本
const getActionText = () => {
  const actionMap = {
    job: "投递简历",
    project: "合作洽谈",
    experience: "收藏",
    document: "下载",
  };
  return actionMap[resource.value.type];
};

// 下载文件
const handleDownload = () => {
  if (!resource.value.file) return;

  uni.downloadFile({
    url: resource.value.file,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveFile({
          tempFilePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: "下载成功",
              icon: "success",
            });
          },
        });
      }
    },
  });
};

// 点赞
const handleLike = () => {
  // TODO: 点赞
  resource.value.isLiked = !resource.value.isLiked;
  resource.value.likeCount += resource.value.isLiked ? 1 : -1;
};

// 评论
const handleComment = () => {
  // TODO: 滚动到评论区
};

// 分享
const handleShare = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

// 提交评论
const handleSubmitComment = () => {
  if (!commentText.value) return;

  // TODO: 提交评论
  resource.value.comments.unshift({
    id: String(Date.now()),
    nickname: userStore.userInfo.nickname,
    avatar: userStore.userInfo.avatar,
    content: commentText.value,
    createTime: new Date().toLocaleString(),
  });
  resource.value.commentCount++;
  commentText.value = "";
};

// 操作
const handleAction = () => {
  if (!canAction.value) return;

  switch (resource.value.type) {
    case "job":
      uni.showToast({
        title: "投递简历功能开发中",
        icon: "none",
      });
      break;
    case "project":
      uni.showToast({
        title: "项目合作功能开发中",
        icon: "none",
      });
      break;
    case "experience":
      uni.showToast({
        title: "收藏功能开发中",
        icon: "none",
      });
      break;
    case "document":
      handleDownload();
      break;
  }
};

onMounted(() => {
  // TODO: 获取资源详情
});
</script>

<style lang="scss">
.resource-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .header {
    background-color: #fff;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }

      .info {
        .nickname {
          font-size: 28rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 4rpx;
        }

        .time {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .type {
      padding: 4rpx 12rpx;
      border-radius: 4rpx;
      font-size: 24rpx;

      &.job {
        background-color: #e6f7ff;
        color: #1890ff;
      }

      &.project {
        background-color: #f6ffed;
        color: #52c41a;
      }

      &.experience {
        background-color: #fff7e6;
        color: #fa8c16;
      }

      &.document {
        background-color: #f9f0ff;
        color: #722ed1;
      }
    }
  }

  .content {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 30rpx;

    .title {
      font-size: 32rpx;
      color: #333;
      font-weight: bold;
      margin-bottom: 20rpx;
    }

    .description {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      margin-bottom: 40rpx;
    }

    .section {
      margin-bottom: 40rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .section-title {
        font-size: 28rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 20rpx;
      }

      .text {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
      }

      .file {
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        padding: 20rpx;

        .iconfont {
          font-size: 48rpx;
          color: #666;
          margin-right: 20rpx;
        }

        .name {
          flex: 1;
          font-size: 28rpx;
          color: #333;
          margin-right: 20rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .size {
          font-size: 24rpx;
          color: #999;
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .tag {
          padding: 4rpx 16rpx;
          background-color: #f5f5f5;
          border-radius: 4rpx;
          font-size: 24rpx;
          color: #666;
          margin-right: 16rpx;
          margin-bottom: 16rpx;
        }
      }

      .contact {
        font-size: 28rpx;
        color: #333;
      }
    }
  }

  .stats {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .iconfont {
        font-size: 40rpx;
        color: #999;
        margin-bottom: 4rpx;

        &.active {
          color: #ff4d4f;
        }
      }

      .count {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .section {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 30rpx;

    .section-title {
      font-size: 28rpx;
      color: #333;
      font-weight: bold;
      margin-bottom: 20rpx;
    }

    .empty {
      padding: 40rpx 0;
      text-align: center;
      color: #999;
      font-size: 28rpx;
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
    padding: 0 30rpx;

    .input {
      flex: 1;
      height: 72rpx;
      background-color: #f5f5f5;
      border-radius: 36rpx;
      padding: 0 30rpx;
      font-size: 28rpx;
      margin-right: 20rpx;
    }

    .action-btn {
      width: 160rpx;
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

  .placeholder {
    color: #999;
  }
}
</style>
