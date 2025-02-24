<template>
  <view class="create-resource">
    <form @submit="handleSubmit">
      <view class="form-group">
        <text class="label">资源类型</text>
        <view class="type-list">
          <view
            v-for="type in types"
            :key="type.value"
            class="type-item"
            :class="{ active: form.type === type.value }"
            @tap="handleSelectType(type.value)"
          >
            <text class="iconfont" :class="type.icon"></text>
            <text class="text">{{ type.label }}</text>
          </view>
        </view>
      </view>

      <view class="form-group">
        <text class="label">标题</text>
        <input
          class="input"
          type="text"
          v-model="form.title"
          placeholder="请输入标题"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">描述</text>
        <textarea
          class="textarea"
          v-model="form.description"
          placeholder="请输入描述"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group" v-if="form.type === 'job'">
        <text class="label">职位要求</text>
        <textarea
          class="textarea"
          v-model="form.requirement"
          placeholder="请输入职位要求"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group" v-if="form.type === 'project'">
        <text class="label">项目预算</text>
        <input
          class="input"
          type="digit"
          v-model="form.budget"
          placeholder="请输入项目预算"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group" v-if="form.type === 'document'">
        <text class="label">文档附件</text>
        <view class="upload-box" @tap="handleUploadFile">
          <view v-if="form.file" class="file">
            <text class="iconfont icon-file"></text>
            <text class="name">{{ form.fileName }}</text>
            <text
              class="iconfont icon-close"
              @tap.stop="handleRemoveFile"
            ></text>
          </view>
          <view v-else class="placeholder">
            <text class="iconfont icon-upload"></text>
            <text class="text">上传文档</text>
          </view>
        </view>
      </view>

      <view class="form-group">
        <text class="label">标签</text>
        <view class="tag-box">
          <view v-for="(tag, index) in form.tags" :key="index" class="tag">
            <text class="text">{{ tag }}</text>
            <text
              class="iconfont icon-close"
              @tap="handleRemoveTag(index)"
            ></text>
          </view>
          <input
            class="tag-input"
            type="text"
            v-model="tagInput"
            placeholder="输入标签按回车添加"
            placeholder-class="placeholder"
            @confirm="handleAddTag"
          />
        </view>
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

      <button
        class="submit-btn"
        :disabled="loading"
        :loading="loading"
        form-type="submit"
      >
        {{ loading ? "发布中..." : "发布资源" }}
      </button>
    </form>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { createResource } from "../../../api/resource";
import type { Resource } from "../../../api/resource";

// 用户状态管理
const userStore = useUserStore();

// 资源类型
const types = [
  { label: "求职招聘", value: "job" as const, icon: "icon-work" },
  { label: "项目合作", value: "project" as const, icon: "icon-project" },
  { label: "经验分享", value: "experience" as const, icon: "icon-share" },
  { label: "资料文档", value: "document" as const, icon: "icon-file" },
] as const;

// 表单数据
const form = reactive<Partial<Resource>>({
  type: "job",
  title: "",
  description: "",
  requirement: "",
  budget: "",
  file: "",
  fileName: "",
  tags: [],
  contact: "",
});

// 标签输入
const tagInput = ref("");

// 加载状态
const loading = ref(false);

// 选择类型
const handleSelectType = (type: Resource["type"]) => {
  form.type = type;
};

// 上传文件
const handleUploadFile = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album"],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0];
      const tempFileName = tempFilePath.split("/").pop() || "未命名文件";
      // TODO: 上传文件到服务器
      form.file = tempFilePath;
      form.fileName = tempFileName;
    },
  });
};

// 移除文件
const handleRemoveFile = () => {
  form.file = "";
  form.fileName = "";
};

// 添加标签
const handleAddTag = () => {
  if (!tagInput.value) return;
  if (form.tags?.includes(tagInput.value)) {
    uni.showToast({
      title: "标签已存在",
      icon: "none",
    });
    return;
  }
  form.tags = [...(form.tags || []), tagInput.value];
  tagInput.value = "";
};

// 移除标签
const handleRemoveTag = (index: number) => {
  if (form.tags) {
    form.tags = form.tags.filter((_: string, i: number) => i !== index);
  }
};

// 提交表单
const handleSubmit = async () => {
  // 表单验证
  if (!form.title) {
    uni.showToast({
      title: "请输入标题",
      icon: "none",
    });
    return;
  }
  if (!form.description) {
    uni.showToast({
      title: "请输入描述",
      icon: "none",
    });
    return;
  }
  if (form.type === "job" && !form.requirement) {
    uni.showToast({
      title: "请输入职位要求",
      icon: "none",
    });
    return;
  }
  if (form.type === "project" && !form.budget) {
    uni.showToast({
      title: "请输入项目预算",
      icon: "none",
    });
    return;
  }
  if (form.type === "document" && !form.file) {
    uni.showToast({
      title: "请上传文档",
      icon: "none",
    });
    return;
  }
  if (!form.tags?.length) {
    uni.showToast({
      title: "请添加标签",
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
    const { data } = await createResource({
      ...form,
      nickname: userStore.userInfo.nickname,
      avatar: userStore.userInfo.avatar,
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
.create-resource {
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

    .type-list {
      display: flex;
      flex-wrap: wrap;

      .type-item {
        width: calc(50% - 10rpx);
        height: 120rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
        margin-bottom: 20rpx;

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:nth-last-child(-n + 2) {
          margin-bottom: 0;
        }

        &.active {
          background-color: #e6f7ff;

          .iconfont {
            color: #1890ff;
          }

          .text {
            color: #1890ff;
          }
        }

        .iconfont {
          font-size: 48rpx;
          color: #666;
          margin-bottom: 10rpx;
        }

        .text {
          font-size: 28rpx;
          color: #666;
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

    .textarea {
      width: 100%;
      height: 240rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      padding: 20rpx;
      font-size: 28rpx;
    }

    .upload-box {
      width: 100%;
      height: 120rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
      overflow: hidden;

      .file {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 20rpx;

        .iconfont {
          font-size: 48rpx;
          color: #666;
          margin-right: 20rpx;

          &.icon-close {
            margin-right: 0;
            margin-left: auto;
            font-size: 32rpx;
          }
        }

        .name {
          flex: 1;
          font-size: 28rpx;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .placeholder {
        width: 100%;
        height: 100%;
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
          font-size: 28rpx;
          color: #999;
        }
      }
    }

    .tag-box {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -20rpx;

      .tag {
        height: 56rpx;
        background-color: #f5f5f5;
        border-radius: 28rpx;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;

        .text {
          font-size: 24rpx;
          color: #666;
          margin-right: 10rpx;
        }

        .iconfont {
          font-size: 24rpx;
          color: #999;
        }
      }

      .tag-input {
        width: 240rpx;
        height: 56rpx;
        background-color: #f5f5f5;
        border-radius: 28rpx;
        padding: 0 20rpx;
        font-size: 24rpx;
        margin-bottom: 20rpx;
      }
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
