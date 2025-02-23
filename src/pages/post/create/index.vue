<template>
  <view class="post-create">
    <view class="form-box">
      <textarea
        class="content"
        v-model="form.content"
        placeholder="分享你的近况..."
        placeholder-class="placeholder"
        :maxlength="2000"
        :show-confirm-bar="false"
      />

      <view class="image-list" v-if="form.images.length > 0">
        <view
          v-for="(image, index) in form.images"
          :key="index"
          class="image-item"
        >
          <image
            class="image"
            :src="image"
            mode="aspectFill"
            @tap="handlePreviewImage(index)"
          />
          <view class="delete-btn" @tap="handleDeleteImage(index)">
            <text class="iconfont icon-close"></text>
          </view>
        </view>
      </view>

      <view class="upload-box" v-if="form.images.length < 9">
        <view class="upload-btn" @tap="handleChooseImage">
          <text class="iconfont icon-image"></text>
          <text class="text">添加图片</text>
          <text class="count">{{ form.images.length }}/9</text>
        </view>
      </view>

      <view class="location-box" v-if="form.location">
        <text class="iconfont icon-location"></text>
        <text class="location">{{ form.location }}</text>
        <text class="iconfont icon-close" @tap="handleClearLocation"></text>
      </view>
    </view>

    <view class="toolbar">
      <view class="tool-item" @tap="handleChooseLocation">
        <text class="iconfont icon-location"></text>
        <text class="label">位置</text>
      </view>
      <view class="tool-item" @tap="handleChooseTopic">
        <text class="iconfont icon-topic"></text>
        <text class="label">话题</text>
      </view>
      <view class="tool-item" @tap="handleChooseActivity">
        <text class="iconfont icon-activity"></text>
        <text class="label">活动</text>
      </view>
      <view class="tool-item" @tap="handleChooseVisibility">
        <text class="iconfont icon-visibility"></text>
        <text class="label">可见范围</text>
      </view>
    </view>

    <view class="submit-box">
      <button
        class="submit-btn"
        @tap="handleSubmit"
        :disabled="loading || !form.content"
      >
        {{ loading ? "发布中..." : "发布" }}
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";

// 用户状态管理
const userStore = useUserStore();

// 表单数据
const form = reactive({
  content: "",
  images: [] as string[],
  location: "",
  topic: "",
  activity: "",
  visibility: "public" as "public" | "private" | "friends",
});

// 加载状态
const loading = ref(false);

// 选择图片
const handleChooseImage = () => {
  uni.chooseImage({
    count: 9 - form.images.length,
    success: (res) => {
      form.images.push(...res.tempFilePaths);
    },
  });
};

// 预览图片
const handlePreviewImage = (index: number) => {
  uni.previewImage({
    urls: form.images,
    current: form.images[index],
  });
};

// 删除图片
const handleDeleteImage = (index: number) => {
  form.images.splice(index, 1);
};

// 选择位置
const handleChooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      form.location = res.name;
    },
  });
};

// 清除位置
const handleClearLocation = () => {
  form.location = "";
};

// 选择话题
const handleChooseTopic = () => {
  uni.showToast({
    title: "话题功能开发中",
    icon: "none",
  });
};

// 选择活动
const handleChooseActivity = () => {
  uni.showToast({
    title: "活动功能开发中",
    icon: "none",
  });
};

// 选择可见范围
const handleChooseVisibility = () => {
  uni.showActionSheet({
    itemList: ["公开", "仅好友可见", "仅自己可见"],
    success: (res) => {
      const visibilityMap: Record<number, typeof form.visibility> = {
        0: "public",
        1: "friends",
        2: "private",
      };
      form.visibility = visibilityMap[res.tapIndex];
    },
  });
};

// 发布动态
const handleSubmit = async () => {
  if (!form.content) {
    uni.showToast({
      title: "请输入内容",
      icon: "none",
    });
    return;
  }

  loading.value = true;
  try {
    // TODO: 上传图片
    const uploadedImages =
      form.images.length > 0
        ? await Promise.all(
            form.images.map((image) => {
              return new Promise<string>((resolve) => {
                setTimeout(() => {
                  resolve(image);
                }, 500);
              });
            })
          )
        : [];

    // TODO: 调用发布接口
    await new Promise((resolve) => setTimeout(resolve, 1000));

    uni.showToast({
      title: "发布成功",
      icon: "success",
    });

    // 返回上一页
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    uni.showToast({
      title: "发布失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.post-create {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 120rpx;

  .form-box {
    padding: 30rpx;

    .content {
      width: 100%;
      height: 300rpx;
      font-size: 32rpx;
      line-height: 1.6;
    }

    .placeholder {
      color: #999;
      font-size: 32rpx;
    }

    .image-list {
      display: flex;
      flex-wrap: wrap;
      margin: 20rpx -10rpx;

      .image-item {
        position: relative;
        width: 220rpx;
        height: 220rpx;
        margin: 10rpx;

        .image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }

        .delete-btn {
          position: absolute;
          top: -20rpx;
          right: -20rpx;
          width: 40rpx;
          height: 40rpx;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            font-size: 24rpx;
            color: #fff;
          }
        }
      }
    }

    .upload-box {
      margin: 20rpx 0;

      .upload-btn {
        width: 220rpx;
        height: 220rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .iconfont {
          font-size: 48rpx;
          color: #999;
          margin-bottom: 10rpx;
        }

        .text {
          font-size: 24rpx;
          color: #999;
        }

        .count {
          font-size: 24rpx;
          color: #999;
          margin-top: 4rpx;
        }
      }
    }

    .location-box {
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      padding: 20rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;

      .iconfont {
        font-size: 32rpx;
        color: #999;

        &.icon-location {
          color: #018eff;
          margin-right: 10rpx;
        }
      }

      .location {
        flex: 1;
        font-size: 28rpx;
        color: #333;
      }
    }
  }

  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 90rpx;
    height: 100rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    display: flex;
    align-items: center;
    padding: 0 30rpx;

    .tool-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 60rpx;

      .iconfont {
        font-size: 48rpx;
        color: #666;
        margin-bottom: 4rpx;
      }

      .label {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .submit-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 90rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    display: flex;
    align-items: center;
    padding: 0 30rpx;

    .submit-btn {
      flex: 1;
      height: 70rpx;
      background-color: #018eff;
      color: #fff;
      font-size: 32rpx;
      border-radius: 35rpx;

      &[disabled] {
        opacity: 0.6;
      }
    }
  }
}
</style>
