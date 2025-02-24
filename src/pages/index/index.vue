<script lang="ts" setup>
// index.vue
import { ref, onMounted } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { postApi } from "mock";

interface Reply {
  id: string;
  nickname: string;
  content: string;
  createTime: string;
  replyTo: string;
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

interface Post {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  images: string[];
  location?: string;
  createTime: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isLiked: boolean;
  comments: Comment[];
}

// 搜索关键词
const keyword = ref("");

// 动态列表
const posts = ref<Post[]>([]);

// 是否正在刷新
const isRefreshing = ref(false);

// 分页参数
const page = ref(1);
const pageSize = 10;
const hasMore = ref(true);

// 搜索
const handleSearch = () => {
  loadPosts();
};

// 发布动态
const handlePost = () => {
  uni.navigateTo({
    url: "/pages/post/create",
  });
};

// 加载动态列表
const loadPosts = async () => {
  try {
    const res = await postApi.getPosts({ keyword: keyword.value });
    posts.value = res.data;
  } catch (error) {
    console.error("加载动态列表失败", error);
    uni.showToast({
      title: "加载失败",
      icon: "none",
    });
  }
};

// 处理图片加载错误
const handleImageError = (e: any) => {
  const target = e.target;
  if (target && target.src) {
    // 设置默认图片
    if (target.src.includes("avatar")) {
      target.src = "/static/avatar/default.png";
    } else {
      target.src = "/static/images/default.jpg";
    }
  }
};

// 预览图片
const handlePreviewImage = (images: string[], current: number) => {
  uni.previewImage({
    urls: images,
    current: images[current],
  });
};

// 点赞
const handleLike = async (post: Post) => {
  try {
    await postApi.likePost(post.id);
    post.isLiked = !post.isLiked;
    post.likeCount += post.isLiked ? 1 : -1;
  } catch (error) {
    console.error("点赞失败", error);
    uni.showToast({
      title: "操作失败",
      icon: "none",
    });
  }
};

// 评论
const handleComment = (post: Post) => {
  uni.navigateTo({
    url: `/pages/post/detail?id=${post.id}`,
  });
};

// 分享
const handleShare = (post: Post) => {
  uni.showActionSheet({
    itemList: ["分享到微信", "复制链接"],
    success: (res) => {
      if (res.tapIndex === 0) {
        // TODO: 实现微信分享
        uni.showToast({
          title: "分享功能开发中",
          icon: "none",
        });
      } else if (res.tapIndex === 1) {
        // TODO: 实现复制链接
        uni.setClipboardData({
          data: `https://example.com/post/${post.id}`,
          success: () => {
            uni.showToast({
              title: "链接已复制",
              icon: "success",
            });
          },
        });
      }
    },
  });
};

// 加载更多
const handleLoadMore = () => {
  // TODO: 实现加载更多
  uni.showToast({
    title: "没有更多了",
    icon: "none",
  });
};

// 刷新
const handleRefresh = async () => {
  isRefreshing.value = true;
  await loadPosts();
  isRefreshing.value = false;
};

onMounted(() => {
  loadPosts();
});

// 下拉刷新
onPullDownRefresh(() => {
  handleRefresh();
});

// 上拉加载
onReachBottom(() => {
  handleLoadMore();
});
</script>

<template>
  <view class="home">
    <view class="header">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input
          class="input"
          type="text"
          v-model="keyword"
          placeholder="搜索动态、活动、资源"
          placeholder-class="placeholder"
          @confirm="handleSearch"
        />
      </view>
      <view class="post-btn" @tap="handlePost">
        <text class="iconfont icon-add"></text>
      </view>
    </view>

    <view class="post-list">
      <view class="post-item" v-for="post in posts" :key="post.id">
        <view class="post-header">
          <image
            class="avatar"
            :src="post.avatar"
            mode="aspectFill"
            @error="handleImageError"
          />
          <view class="info">
            <text class="nickname">{{ post.nickname }}</text>
            <text class="time">{{ post.createTime }}</text>
          </view>
        </view>
        <view class="post-content">
          <text class="text">{{ post.content }}</text>
          <view class="images" v-if="post.images && post.images.length > 0">
            <image
              v-for="(image, index) in post.images"
              :key="index"
              :src="image"
              mode="aspectFill"
              @tap="handlePreviewImage(post.images, index)"
              @error="handleImageError"
            />
          </view>
          <view class="location" v-if="post.location">
            <text class="iconfont icon-location"></text>
            <text class="text">{{ post.location }}</text>
          </view>
        </view>
        <view class="post-footer">
          <view class="action-item" @tap="handleLike(post)">
            <text
              class="iconfont"
              :class="post.isLiked ? 'icon-like active' : 'icon-like'"
            ></text>
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
</template>

<style lang="scss">
.home {
  min-height: 100vh;
  background-color: #f5f5f5;

  .header {
    background-color: #fff;
    padding: 20rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

    .search-box {
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

    .post-btn {
      width: 72rpx;
      height: 72rpx;
      background-color: #018eff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 40rpx;
        color: #fff;
      }
    }
  }

  .post-list {
    padding: 20rpx;

    .post-item {
      margin-bottom: 20rpx;
      background-color: #fff;
      padding: 30rpx;
      border-radius: 12rpx;

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

        .info {
          flex: 1;

          .nickname {
            font-size: 32rpx;
            color: #333;
            font-weight: bold;
            margin-bottom: 6rpx;
          }

          .time {
            font-size: 24rpx;
            color: #999;
          }
        }
      }

      .post-content {
        .text {
          font-size: 28rpx;
          color: #333;
          line-height: 1.6;
          margin-bottom: 20rpx;
        }

        .images {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10rpx;
          margin-bottom: 20rpx;

          image {
            width: 100%;
            height: 200rpx;
            border-radius: 8rpx;
          }
        }

        .location {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;

          .iconfont {
            font-size: 28rpx;
            color: #999;
            margin-right: 6rpx;
          }

          .text {
            font-size: 24rpx;
            color: #999;
            margin-bottom: 0;
          }
        }
      }

      .post-footer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-top: 20rpx;
        border-top: 1rpx solid #eee;

        .action-item {
          display: flex;
          align-items: center;

          .iconfont {
            font-size: 36rpx;
            color: #999;
            margin-right: 10rpx;

            &.active {
              color: #ff6b6b;
            }
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
</style>
