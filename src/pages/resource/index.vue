<template>
  <view class="resource">
    <view class="search-box">
      <view class="input-box">
        <text class="iconfont icon-search"></text>
        <input
          class="input"
          type="text"
          v-model="keyword"
          placeholder="搜索资源"
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
      class="resource-list"
      scroll-y
      @scrolltolower="handleLoadMore"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
    >
      <view class="category-list">
        <scroll-view class="scroll-view" scroll-x>
          <view
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            :class="{ active: currentCategory === category.value }"
            @tap="handleChangeCategory(category.value)"
          >
            {{ category.label }}
          </view>
        </scroll-view>
      </view>

      <view v-if="resources.length === 0" class="empty">
        <text>暂无资源</text>
      </view>
      <view v-else class="list">
        <view
          v-for="resource in resources"
          :key="resource.id"
          class="resource-item"
          @tap="handleViewResource(resource)"
        >
          <view class="header">
            <image class="avatar" :src="resource.avatar" mode="aspectFill" />
            <view class="info">
              <text class="nickname">{{ resource.nickname }}</text>
              <text class="time">{{ resource.createTime }}</text>
            </view>
            <view class="type" :class="resource.type">
              {{ getTypeText(resource.type) }}
            </view>
          </view>
          <view class="content">
            <view class="title">{{ resource.title }}</view>
            <view class="description">{{ resource.description }}</view>
            <view class="tags">
              <text
                v-for="(tag, index) in resource.tags"
                :key="index"
                class="tag"
                >{{ tag }}</text
              >
            </view>
          </view>
          <view class="footer">
            <view class="stats">
              <view class="stat-item">
                <text class="iconfont icon-view"></text>
                <text class="count">{{ resource.viewCount }}</text>
              </view>
              <view class="stat-item">
                <text class="iconfont icon-like"></text>
                <text class="count">{{ resource.likeCount }}</text>
              </view>
              <view class="stat-item">
                <text class="iconfont icon-comment"></text>
                <text class="count">{{ resource.commentCount }}</text>
              </view>
            </view>
            <view class="action" @tap.stop="handleAction(resource)">
              <text class="text">{{ getActionText(resource.type) }}</text>
              <text class="iconfont icon-arrow-right"></text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="fab-button" @tap="handleCreateResource">
      <text class="iconfont icon-add"></text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { getResources } from "@/api";
import type { Resource } from "@/api";

// 用户状态管理
const userStore = useUserStore();

// 搜索关键词
const keyword = ref("");

// 分类列表
const categories = [
  { label: "全部", value: "all" as const },
  { label: "求职招聘", value: "job" as const },
  { label: "项目合作", value: "project" as const },
  { label: "经验分享", value: "experience" as const },
  { label: "资料文档", value: "document" as const },
] as const;

// 当前分类
const currentCategory = ref<Resource["type"] | "all">("all");

// 资源列表
const resources = ref<Resource[]>([]);

// 刷新状态
const refreshing = ref(false);

// 搜索
const handleSearch = async () => {
  if (!keyword.value) return;

  try {
    const { data } = await getResources({ keyword: keyword.value });
    resources.value = data;
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

// 切换分类
const handleChangeCategory = async (
  category: (typeof categories)[number]["value"]
) => {
  currentCategory.value = category;
  try {
    const { data } = await getResources({
      type: category === "all" ? undefined : category,
    });
    resources.value = data;
  } catch (error) {
    console.error("获取资源列表失败:", error);
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  }
};

// 查看资源详情
const handleViewResource = (resource: Resource) => {
  uni.navigateTo({
    url: `/pages/resource/detail/index?id=${resource.id}`,
  });
};

// 创建资源
const handleCreateResource = () => {
  uni.navigateTo({
    url: "/pages/resource/create/index",
  });
};

// 资源操作
const handleAction = (resource: Resource) => {
  switch (resource.type) {
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
      uni.showToast({
        title: "下载功能开发中",
        icon: "none",
      });
      break;
  }
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
    const { data } = await getResources({
      type: currentCategory.value === "all" ? undefined : currentCategory.value,
    });
    resources.value = data;
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

// 获取类型文本
const getTypeText = (type: Resource["type"]) => {
  const typeMap = {
    job: "招聘",
    project: "项目",
    experience: "经验",
    document: "文档",
  };
  return typeMap[type];
};

// 获取操作文本
const getActionText = (type: Resource["type"]) => {
  const actionMap = {
    job: "投递简历",
    project: "合作洽谈",
    experience: "收藏",
    document: "下载",
  };
  return actionMap[type];
};

onMounted(async () => {
  try {
    const { data } = await getResources();
    resources.value = data;
  } catch (error) {
    console.error("获取资源列表失败:", error);
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  }
});
</script>

<style lang="scss">
.resource {
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

  .resource-list {
    height: calc(100vh - 112rpx);

    .category-list {
      background-color: #fff;
      padding: 20rpx 0;
      margin-bottom: 20rpx;

      .scroll-view {
        white-space: nowrap;
        padding: 0 30rpx;

        .category-item {
          display: inline-block;
          padding: 12rpx 30rpx;
          margin-right: 20rpx;
          background-color: #f5f5f5;
          border-radius: 32rpx;
          font-size: 28rpx;
          color: #666;

          &:last-child {
            margin-right: 0;
          }

          &.active {
            background-color: #018eff;
            color: #fff;
          }
        }
      }
    }

    .empty {
      padding: 40rpx 0;
      text-align: center;
      color: #999;
    }

    .list {
      padding: 20rpx;

      .resource-item {
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 16rpx;
        padding: 20rpx;

        .header {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;

          .avatar {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }

          .info {
            flex: 1;

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
          .title {
            font-size: 32rpx;
            color: #333;
            font-weight: bold;
            margin-bottom: 10rpx;
          }

          .description {
            font-size: 28rpx;
            color: #666;
            line-height: 1.6;
            margin-bottom: 20rpx;
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
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20rpx;
          padding-top: 20rpx;
          border-top: 1rpx solid #eee;

          .stats {
            display: flex;
            align-items: center;

            .stat-item {
              display: flex;
              align-items: center;
              margin-right: 30rpx;

              .iconfont {
                font-size: 32rpx;
                color: #999;
                margin-right: 8rpx;
              }

              .count {
                font-size: 24rpx;
                color: #999;
              }
            }
          }

          .action {
            display: flex;
            align-items: center;
            padding: 12rpx 24rpx;
            background-color: #018eff;
            border-radius: 32rpx;

            .text {
              font-size: 28rpx;
              color: #fff;
              margin-right: 8rpx;
            }

            .iconfont {
              font-size: 24rpx;
              color: #fff;
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
