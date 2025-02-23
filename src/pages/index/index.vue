<script lang="ts" setup>
// index.vue
import { ref, onMounted } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";

interface Post {
  id: string;
  username: string;
  avatar: string;
  content: string;
  images?: string[];
  createTime: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

const posts = ref<Post[]>([]);
const page = ref(1);
const pageSize = 10;
const loading = ref(false);
const hasMore = ref(true);

// 获取动态列表
const getPosts = async (refresh = false) => {
  if (loading.value || (!hasMore.value && !refresh)) return;

  loading.value = true;
  try {
    // TODO: 调用接口获取数据
    const mockData: Post[] = [
      {
        id: "1",
        username: "张三",
        avatar: "/static/avatar/default.png",
        content: "今天是个好日子，和老同学聚会真开心！",
        images: ["/static/images/demo1.jpg", "/static/images/demo2.jpg"],
        createTime: "2024-02-23 14:30",
        likeCount: 12,
        commentCount: 3,
        shareCount: 1,
      },
    ];

    if (refresh) {
      posts.value = mockData;
      page.value = 1;
    } else {
      posts.value = [...posts.value, ...mockData];
      page.value++;
    }

    hasMore.value = mockData.length === pageSize;
  } catch (error) {
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
    if (refresh) {
      uni.stopPullDownRefresh();
    }
  }
};

// 预览图片
const previewImage = (urls: string[], current: number) => {
  uni.previewImage({
    urls,
    current: urls[current],
  });
};

// 点赞
const handleLike = (post: Post) => {
  // TODO: 实现点赞功能
  uni.showToast({
    title: "点赞功能开发中",
    icon: "none",
  });
};

// 评论
const handleComment = (post: Post) => {
  // TODO: 实现评论功能
  uni.showToast({
    title: "评论功能开发中",
    icon: "none",
  });
};

// 分享
const handleShare = (post: Post) => {
  // TODO: 实现分享功能
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

// 发布动态
const handleCreatePost = () => {
  uni.navigateTo({
    url: "/pages/post/create/index",
  });
};

// 下拉刷新
onPullDownRefresh(() => {
  getPosts(true);
});

// 上拉加载
onReachBottom(() => {
  getPosts();
});

onMounted(() => {
  getPosts();
});
</script>

<template>
  <view class="index">
    <view class="post-list">
      <view v-if="posts.length === 0" class="empty">
        <text>暂无动态</text>
      </view>
      <view v-else class="list">
        <view v-for="post in posts" :key="post.id" class="post-item">
          <view class="post-header">
            <image class="avatar" :src="post.avatar" mode="aspectFill" />
            <view class="user-info">
              <text class="username">{{ post.username }}</text>
              <text class="time">{{ post.createTime }}</text>
            </view>
          </view>
          <view class="post-content">
            <text class="text">{{ post.content }}</text>
            <view
              v-if="post.images && post.images.length > 0"
              class="image-list"
            >
              <image
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                mode="aspectFill"
                class="post-image"
                @tap="previewImage(post.images, index)"
              />
            </view>
          </view>
          <view class="post-footer">
            <view class="action-item" @tap="handleLike(post)">
              <text class="iconfont icon-like"></text>
              <text class="count">{{ post.likeCount }}</text>
            </view>
            <view class="action-item" @tap="handleComment(post)">
              <text class="iconfont icon-comment"></text>
              <text class="count">{{ post.commentCount }}</text>
            </view>
            <view class="action-item" @tap="handleShare(post)">
              <text class="iconfont icon-share"></text>
              <text class="count">{{ post.shareCount }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="fab-button" @tap="handleCreatePost">
      <text class="iconfont icon-add"></text>
    </view>
  </view>
</template>

<style lang="scss">
.index {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;

  .post-list {
    .empty {
      padding: 40rpx 0;
      text-align: center;
      color: #999;
    }

    .list {
      .post-item {
        margin-bottom: 20rpx;
        background-color: #fff;
        padding: 20rpx;

        .post-header {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;

          .avatar {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }

          .user-info {
            flex: 1;

            .username {
              font-size: 28rpx;
              color: #333;
              font-weight: bold;
            }

            .time {
              font-size: 24rpx;
              color: #999;
              margin-top: 4rpx;
            }
          }
        }

        .post-content {
          .text {
            font-size: 28rpx;
            color: #333;
            line-height: 1.6;
          }

          .image-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20rpx;

            .post-image {
              width: 220rpx;
              height: 220rpx;
              margin-right: 10rpx;
              margin-bottom: 10rpx;

              &:nth-child(3n) {
                margin-right: 0;
              }
            }
          }
        }

        .post-footer {
          display: flex;
          justify-content: space-around;
          margin-top: 20rpx;
          padding-top: 20rpx;
          border-top: 1rpx solid #eee;

          .action-item {
            display: flex;
            align-items: center;

            .iconfont {
              font-size: 36rpx;
              color: #666;
              margin-right: 8rpx;
            }

            .count {
              font-size: 24rpx;
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
