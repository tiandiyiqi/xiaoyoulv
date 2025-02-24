<template>
  <view class="create-activity">
    <form @submit="handleSubmit">
      <view class="form-group">
        <text class="label">活动封面</text>
        <view class="upload-box" @tap="handleUploadCover">
          <image
            v-if="form.cover"
            class="cover"
            :src="form.cover"
            mode="aspectFill"
          />
          <view v-else class="placeholder">
            <text class="iconfont icon-camera"></text>
            <text class="text">上传封面</text>
          </view>
        </view>
      </view>

      <view class="form-group">
        <text class="label">活动标题</text>
        <input
          class="input"
          type="text"
          v-model="form.title"
          placeholder="请输入活动标题"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">活动时间</text>
        <view class="time-box">
          <picker
            mode="date"
            :value="tempDateTime.date"
            @change="handleDateChange"
            class="picker"
          >
            <view class="picker-value">
              <text>{{ tempDateTime.date || "选择日期" }}</text>
              <text class="iconfont icon-arrow-right"></text>
            </view>
          </picker>
          <picker
            mode="time"
            :value="tempDateTime.time"
            @change="handleTimeChange"
            class="picker"
          >
            <view class="picker-value">
              <text>{{ tempDateTime.time || "选择时间" }}</text>
              <text class="iconfont icon-arrow-right"></text>
            </view>
          </picker>
        </view>
      </view>

      <view class="form-group">
        <text class="label">活动地点</text>
        <view class="location-box" @tap="handleChooseLocation">
          <text class="iconfont icon-location"></text>
          <text class="location">{{ form.location || "选择活动地点" }}</text>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>

      <view class="form-group">
        <text class="label">活动人数</text>
        <input
          class="input"
          type="number"
          v-model="form.maxParticipants"
          placeholder="请输入活动人数上限"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">活动费用</text>
        <input
          class="input"
          type="digit"
          v-model="form.fee"
          placeholder="请输入活动费用，0表示免费"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">活动详情</text>
        <textarea
          class="textarea"
          v-model="form.description"
          placeholder="请输入活动详情"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">报名截止</text>
        <picker
          mode="date"
          :value="form.deadline"
          @change="handleDeadlineChange"
          class="picker"
        >
          <view class="picker-value">
            <text>{{ form.deadline || "选择报名截止日期" }}</text>
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>

      <view class="form-group">
        <text class="label">联系方式</text>
        <input
          class="input"
          type="text"
          v-model="form.contact"
          placeholder="请输入联系方式"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">活动须知</text>
        <textarea
          class="textarea"
          v-model="form.notice"
          placeholder="请输入活动须知"
          placeholder-class="placeholder"
        />
      </view>

      <button
        class="submit-btn"
        :disabled="loading"
        :loading="loading"
        form-type="submit"
      >
        {{ loading ? "发布中..." : "发布活动" }}
      </button>
    </form>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { createEvent } from "../../../api/event";
import type { Event } from "../../../api/event";

// 用户状态管理
const userStore = useUserStore();

// 表单数据
const form = reactive<Partial<Event>>({
  cover: "",
  title: "",
  time: "",
  location: "",
  maxParticipants: undefined,
  fee: 0,
  description: "",
  deadline: "",
  contact: "",
  notice: "",
});

// 临时日期和时间
const tempDateTime = reactive({
  date: "",
  time: "",
});

// 加载状态
const loading = ref(false);

// 上传封面
const handleUploadCover = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0];
      // TODO: 上传图片到服务器
      form.cover = tempFilePath;
    },
  });
};

// 选择日期
const handleDateChange = (e: any) => {
  tempDateTime.date = e.detail.value;
  if (tempDateTime.date && tempDateTime.time) {
    form.time = `${tempDateTime.date} ${tempDateTime.time}`;
  }
};

// 选择时间
const handleTimeChange = (e: any) => {
  tempDateTime.time = e.detail.value;
  if (tempDateTime.date && tempDateTime.time) {
    form.time = `${tempDateTime.date} ${tempDateTime.time}`;
  }
};

// 选择地点
const handleChooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      form.location = res.name;
    },
  });
};

// 选择报名截止日期
const handleDeadlineChange = (e: any) => {
  form.deadline = e.detail.value;
};

// 提交表单
const handleSubmit = async () => {
  // 表单验证
  if (!form.cover) {
    uni.showToast({
      title: "请上传活动封面",
      icon: "none",
    });
    return;
  }
  if (!form.title) {
    uni.showToast({
      title: "请输入活动标题",
      icon: "none",
    });
    return;
  }
  if (!form.time) {
    uni.showToast({
      title: "请选择活动时间",
      icon: "none",
    });
    return;
  }
  if (!form.location) {
    uni.showToast({
      title: "请选择活动地点",
      icon: "none",
    });
    return;
  }
  if (!form.maxParticipants) {
    uni.showToast({
      title: "请输入活动人数上限",
      icon: "none",
    });
    return;
  }
  if (!form.description) {
    uni.showToast({
      title: "请输入活动详情",
      icon: "none",
    });
    return;
  }
  if (!form.deadline) {
    uni.showToast({
      title: "请选择报名截止日期",
      icon: "none",
    });
    return;
  }
  if (!form.contact) {
    uni.showToast({
      title: "请输入联系方式",
      icon: "none",
    });
    return;
  }

  loading.value = true;

  try {
    const { data } = await createEvent({
      ...form,
      status: "upcoming",
    });
    uni.showToast({
      title: "发布成功",
      icon: "success",
    });
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
.create-activity {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;

  .form-group {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;

    .label {
      font-size: 28rpx;
      color: #333;
      font-weight: bold;
      margin-bottom: 20rpx;
      display: block;
    }

    .upload-box {
      width: 100%;
      height: 400rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      overflow: hidden;

      .cover {
        width: 100%;
        height: 100%;
      }

      .placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .iconfont {
          font-size: 64rpx;
          color: #999;
          margin-bottom: 20rpx;
        }

        .text {
          font-size: 28rpx;
          color: #999;
        }
      }
    }

    .input {
      width: 100%;
      height: 80rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
    }

    .time-box {
      display: flex;
      align-items: center;

      .picker {
        flex: 1;
        margin-right: 20rpx;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .picker-value {
      height: 80rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;

      .iconfont {
        font-size: 32rpx;
        color: #999;
      }
    }

    .location-box {
      height: 80rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 32rpx;
        color: #999;
        margin-right: 10rpx;

        &:last-child {
          margin-right: 0;
          margin-left: auto;
        }
      }

      .location {
        font-size: 28rpx;
        color: #333;
      }
    }

    .textarea {
      width: 100%;
      height: 240rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      padding: 20rpx;
      font-size: 28rpx;
    }
  }

  .submit-btn {
    width: 100%;
    height: 88rpx;
    background-color: #018eff;
    color: #fff;
    font-size: 32rpx;
    border-radius: 44rpx;
    margin-top: 40rpx;
    margin-bottom: 40rpx;

    &:active {
      opacity: 0.8;
    }

    &::after {
      display: none;
    }
  }

  .placeholder {
    color: #999;
  }
}
</style>
