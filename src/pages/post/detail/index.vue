<template>
  <view class="post-detail">
    <view class="post-content">
      <view class="user-info">
        <image class="avatar" :src="post.avatar" mode="aspectFill" />
        <view class="info">
          <text class="nickname">{{ post.nickname }}</text>
          <text class="time">{{ post.createTime }}</text>
        </view>
        <view class="more-btn" @tap="handleShowMore">
          <text class="iconfont icon-more"></text>
        </view>
      </view>

      <view class="content">
        <text class="text">{{ post.content }}</text>
        <view v-if="post.images && post.images.length > 0" class="image-list">
          <image
            v-for="(image, index) in post.images"
            :key="index"
            :src="image"
            mode="aspectFill"
            class="image"
            @tap="handlePreviewImage(index)"
          />
        </view>
        <view v-if="post.location" class="location">
          <text class="iconfont icon-location"></text>
          <text class="text">{{ post.location }}</text>
        </view>
      </view>

      <view class="stats">
        <view class="stat-item">
          <text class="count">{{ post.likeCount }}</text>
          <text class="label">点赞</text>
        </view>
        <view class="stat-item">
          <text class="count">{{ post.commentCount }}</text>
          <text class="label">评论</text>
        </view>
        <view class="stat-item">
          <text class="count">{{ post.shareCount }}</text>
          <text class="label">分享</text>
        </view>
      </view>

      <view class="action-bar">
        <view
          class="action-item"
          :class="{ active: post.isLiked }"
          @tap="handleLike"
        >
          <text class="iconfont icon-like"></text>
          <text class="text">点赞</text>
        </view>
        <view class="action-item" @tap="handleComment">
          <text class="iconfont icon-comment"></text>
          <text class="text">评论</text>
        </view>
        <view class="action-item" @tap="handleShare">
          <text class="iconfont icon-share"></text>
          <text class="text">分享</text>
        </view>
      </view>
    </view>

    <view class="comment-list">
      <view class="title">
        <text class="text">评论 {{ post.commentCount }}</text>
        <view class="sort-btn" @tap="handleChangeSort">
          <text class="text">{{
            sortType === "time" ? "按时间" : "按热度"
          }}</text>
          <text class="iconfont icon-arrow-down"></text>
        </view>
      </view>

      <view v-if="comments.length === 0" class="empty">
        <text>暂无评论</text>
      </view>

      <view v-else class="list">
        <view
          v-for="comment in comments"
          :key="comment.id"
          class="comment-item"
        >
          <image class="avatar" :src="comment.avatar" mode="aspectFill" />
          <view class="content">
            <view class="header">
              <text class="nickname">{{ comment.nickname }}</text>
              <text class="time">{{ comment.createTime }}</text>
            </view>
            <text class="text">{{ comment.content }}</text>
            <view class="footer">
              <view
                class="like-btn"
                :class="{ active: comment.isLiked }"
                @tap="handleLikeComment(comment)"
              >
                <text class="iconfont icon-like"></text>
                <text class="count">{{ comment.likeCount }}</text>
              </view>
              <view class="reply-btn" @tap="handleReplyComment(comment)">
                <text class="iconfont icon-comment"></text>
                <text class="text">回复</text>
              </view>
            </view>

            <view
              v-if="comment.replies && comment.replies.length > 0"
              class="reply-list"
            >
              <view
                v-for="reply in comment.replies"
                :key="reply.id"
                class="reply-item"
              >
                <text class="nickname">{{ reply.nickname }}</text>
                <text v-if="reply.replyTo" class="reply-to">
                  回复
                  <text class="nickname">{{ reply.replyTo }}</text>
                </text>
                <text class="text">{{ reply.content }}</text>
              </view>
              <view
                v-if="comment.replyCount > comment.replies.length"
                class="more-btn"
                @tap="handleLoadMoreReplies(comment)"
              >
                查看全部{{ comment.replyCount }}条回复
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="comment-box">
      <input
        class="input"
        type="text"
        v-model="commentContent"
        :placeholder="replyTo ? `回复 ${replyTo}` : '说点什么...'"
        placeholder-class="placeholder"
        :focus="showCommentInput"
        @blur="handleCommentBlur"
      />
      <button
        class="submit-btn"
        :disabled="!commentContent"
        @tap="handleSubmitComment"
      >
        发送
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";

// 用户状态管理
const userStore = useUserStore();

// 动态数据
const post = reactive({
  id: "1",
  nickname: "张三",
  avatar: "/static/avatar/default.png",
  content: "今天是个好日子，和老同学聚会真开心！",
  images: ["/static/images/demo1.jpg", "/static/images/demo2.jpg"],
  location: "深圳市南山区",
  createTime: "2024-02-23 14:30",
  likeCount: 128,
  commentCount: 32,
  shareCount: 16,
  isLiked: false,
});

interface Reply {
  id: string;
  nickname: string;
  content: string;
  createTime: string;
  replyTo?: string;
}

interface Comment {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  createTime: string;
  likeCount: number;
  isLiked: boolean;
  replyCount: number;
  replies: Reply[];
}

// 评论列表
const comments = ref<Comment[]>([
  {
    id: "1",
    nickname: "李四",
    avatar: "/static/avatar/default.png",
    content: "看起来很开心啊！",
    createTime: "2024-02-23 14:35",
    likeCount: 12,
    isLiked: false,
    replyCount: 2,
    replies: [
      {
        id: "1-1",
        nickname: "王五",
        content: "是啊是啊",
        createTime: "2024-02-23 14:36",
        replyTo: "李四",
      },
    ],
  },
]);

// 评论排序方式
const sortType = ref<"time" | "hot">("time");

// 评论内容
const commentContent = ref("");

// 回复对象
const replyTo = ref("");

// 是否显示评论输入框
const showCommentInput = ref(false);

// 预览图片
const handlePreviewImage = (index: number) => {
  uni.previewImage({
    urls: post.images,
    current: post.images[index],
  });
};

// 显示更多操作
const handleShowMore = () => {
  uni.showActionSheet({
    itemList: ["举报"],
    success: (res) => {
      if (res.tapIndex === 0) {
        uni.showToast({
          title: "举报功能开发中",
          icon: "none",
        });
      }
    },
  });
};

// 点赞动态
const handleLike = () => {
  post.isLiked = !post.isLiked;
  post.likeCount += post.isLiked ? 1 : -1;
};

// 评论动态
const handleComment = () => {
  showCommentInput.value = true;
  replyTo.value = "";
};

// 分享动态
const handleShare = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

// 切换评论排序方式
const handleChangeSort = () => {
  sortType.value = sortType.value === "time" ? "hot" : "time";
  // TODO: 重新加载评论列表
};

// 点赞评论
const handleLikeComment = (comment: Comment) => {
  comment.isLiked = !comment.isLiked;
  comment.likeCount += comment.isLiked ? 1 : -1;
};

// 回复评论
const handleReplyComment = (comment: Comment) => {
  showCommentInput.value = true;
  replyTo.value = comment.nickname;
};

// 加载更多回复
const handleLoadMoreReplies = (comment: Comment) => {
  // TODO: 加载更多回复
  uni.showToast({
    title: "加载更多回复功能开发中",
    icon: "none",
  });
};

// 评论框失焦
const handleCommentBlur = () => {
  showCommentInput.value = false;
};

// 提交评论
const handleSubmitComment = () => {
  if (!commentContent.value) return;

  // TODO: 提交评论
  const comment: Comment = {
    id: String(Date.now()),
    nickname: userStore.getUserInfo?.nickname || "未设置昵称",
    avatar: userStore.getUserInfo?.avatar || "/static/avatar/default.png",
    content: commentContent.value,
    createTime: new Date().toLocaleString(),
    likeCount: 0,
    isLiked: false,
    replyCount: 0,
    replies: [],
  };

  comments.value.unshift(comment);
  post.commentCount++;
  commentContent.value = "";
  showCommentInput.value = false;
};
</script>

<style lang="scss">
.post-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .post-content {
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }

      .info {
        flex: 1;

        .nickname {
          font-size: 32rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 4rpx;
        }

        .time {
          font-size: 24rpx;
          color: #999;
        }
      }

      .more-btn {
        padding: 20rpx;
        margin: -20rpx;

        .iconfont {
          font-size: 40rpx;
          color: #999;
        }
      }
    }

    .content {
      .text {
        font-size: 32rpx;
        color: #333;
        line-height: 1.6;
      }

      .image-list {
        display: flex;
        flex-wrap: wrap;
        margin: 20rpx -10rpx;

        .image {
          width: 220rpx;
          height: 220rpx;
          margin: 10rpx;
          border-radius: 8rpx;
        }
      }

      .location {
        display: flex;
        align-items: center;
        margin-top: 20rpx;

        .iconfont {
          font-size: 28rpx;
          color: #018eff;
          margin-right: 8rpx;
        }

        .text {
          font-size: 28rpx;
          color: #666;
        }
      }
    }

    .stats {
      display: flex;
      justify-content: space-around;
      margin-top: 30rpx;
      padding: 20rpx 0;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .count {
          font-size: 32rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 4rpx;
        }

        .label {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .action-bar {
      display: flex;
      justify-content: space-around;
      margin-top: 20rpx;

      .action-item {
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 40rpx;
          color: #666;
          margin-right: 8rpx;
        }

        .text {
          font-size: 28rpx;
          color: #666;
        }

        &.active {
          .iconfont,
          .text {
            color: #018eff;
          }
        }
      }
    }
  }

  .comment-list {
    background-color: #fff;
    padding: 30rpx;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;

      .text {
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
      }

      .sort-btn {
        display: flex;
        align-items: center;

        .text {
          font-size: 28rpx;
          color: #666;
          font-weight: normal;
        }

        .iconfont {
          font-size: 24rpx;
          color: #666;
          margin-left: 4rpx;
        }
      }
    }

    .empty {
      padding: 60rpx 0;
      text-align: center;
      color: #999;
      font-size: 28rpx;
    }

    .list {
      .comment-item {
        display: flex;
        margin-bottom: 30rpx;

        .avatar {
          width: 64rpx;
          height: 64rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .content {
          flex: 1;

          .header {
            display: flex;
            align-items: center;
            margin-bottom: 8rpx;

            .nickname {
              font-size: 28rpx;
              color: #333;
              font-weight: bold;
              margin-right: 10rpx;
            }

            .time {
              font-size: 24rpx;
              color: #999;
            }
          }

          .text {
            font-size: 28rpx;
            color: #333;
            line-height: 1.6;
          }

          .footer {
            display: flex;
            align-items: center;
            margin-top: 10rpx;

            .like-btn {
              display: flex;
              align-items: center;
              margin-right: 30rpx;

              .iconfont {
                font-size: 28rpx;
                color: #666;
                margin-right: 4rpx;
              }

              .count {
                font-size: 24rpx;
                color: #666;
              }

              &.active {
                .iconfont,
                .count {
                  color: #018eff;
                }
              }
            }

            .reply-btn {
              display: flex;
              align-items: center;

              .iconfont {
                font-size: 28rpx;
                color: #666;
                margin-right: 4rpx;
              }

              .text {
                font-size: 24rpx;
                color: #666;
              }
            }
          }

          .reply-list {
            margin-top: 20rpx;
            padding: 20rpx;
            background-color: #f5f5f5;
            border-radius: 8rpx;

            .reply-item {
              margin-bottom: 16rpx;

              &:last-child {
                margin-bottom: 0;
              }

              .nickname {
                font-size: 24rpx;
                color: #018eff;
                margin-right: 8rpx;
              }

              .reply-to {
                font-size: 24rpx;
                color: #999;

                .nickname {
                  margin: 0 4rpx;
                }
              }

              .text {
                font-size: 24rpx;
                color: #333;
              }
            }

            .more-btn {
              margin-top: 16rpx;
              font-size: 24rpx;
              color: #018eff;
              text-align: center;
            }
          }
        }
      }
    }
  }

  .comment-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    display: flex;
    align-items: center;

    .input {
      flex: 1;
      height: 72rpx;
      background-color: #f5f5f5;
      border-radius: 36rpx;
      padding: 0 30rpx;
      font-size: 28rpx;
      margin-right: 20rpx;
    }

    .placeholder {
      color: #999;
    }

    .submit-btn {
      width: 120rpx;
      height: 72rpx;
      background-color: #018eff;
      color: #fff;
      font-size: 28rpx;
      border-radius: 36rpx;

      &[disabled] {
        opacity: 0.6;
      }
    }
  }
}
</style>
