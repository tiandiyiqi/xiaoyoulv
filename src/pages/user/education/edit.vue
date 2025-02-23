<template>
  <view class="education-edit">
    <view class="form-box">
      <view class="form-item">
        <text class="label">学校名称</text>
        <input
          class="input"
          type="text"
          v-model="form.school"
          placeholder="请输入学校名称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">专业</text>
        <input
          class="input"
          type="text"
          v-model="form.major"
          placeholder="请输入专业名称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">学历</text>
        <picker
          class="picker"
          :range="degreeOptions"
          :value="degreeIndex"
          @change="handleDegreeChange"
        >
          <view class="picker-value">
            {{ form.degree || "请选择学历" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">入学年份</text>
        <picker
          class="picker"
          mode="date"
          fields="year"
          :value="form.startYear"
          @change="handleStartYearChange"
        >
          <view class="picker-value">
            {{ form.startYear || "请选择入学年份" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">毕业年份</text>
        <picker
          class="picker"
          mode="date"
          fields="year"
          :value="form.endYear"
          @change="handleEndYearChange"
        >
          <view class="picker-value">
            {{ form.endYear || "请选择毕业年份" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>
    </view>

    <button class="submit-btn" @tap="handleSave">保存</button>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

// 学历选项
const degreeOptions = ["专科", "本科", "硕士", "博士"];
const degreeIndex = ref(0);

// 表单数据
const form = reactive({
  school: "",
  major: "",
  degree: "",
  startYear: "",
  endYear: "",
});

// 编辑的索引
const editIndex = ref(-1);

// 学历选择
const handleDegreeChange = (e: any) => {
  const index = e.detail.value;
  degreeIndex.value = index;
  form.degree = degreeOptions[index];
};

// 入学年份选择
const handleStartYearChange = (e: any) => {
  form.startYear = e.detail.value;
};

// 毕业年份选择
const handleEndYearChange = (e: any) => {
  form.endYear = e.detail.value;
};

// 保存
const handleSave = () => {
  if (!form.school) {
    uni.showToast({
      title: "请输入学校名称",
      icon: "none",
    });
    return;
  }

  if (!form.major) {
    uni.showToast({
      title: "请输入专业名称",
      icon: "none",
    });
    return;
  }

  if (!form.degree) {
    uni.showToast({
      title: "请选择学历",
      icon: "none",
    });
    return;
  }

  if (!form.startYear) {
    uni.showToast({
      title: "请选择入学年份",
      icon: "none",
    });
    return;
  }

  if (!form.endYear) {
    uni.showToast({
      title: "请选择毕业年份",
      icon: "none",
    });
    return;
  }

  if (form.startYear > form.endYear) {
    uni.showToast({
      title: "入学年份不能大于毕业年份",
      icon: "none",
    });
    return;
  }

  // 获取页面实例
  const pages = getCurrentPages();
  const prevPage = pages[pages.length - 2];

  // 更新上一页数据
  if (editIndex.value > -1) {
    prevPage.$vm.form.education[editIndex.value] = { ...form };
  } else {
    prevPage.$vm.form.education.push({ ...form });
  }

  uni.navigateBack();
};

onMounted(() => {
  // 获取编辑数据
  const query = uni.getStorageSync("education_edit_data");
  if (query) {
    const { index, data } = query;
    if (data) {
      Object.assign(form, data);
      const idx = degreeOptions.findIndex((item) => item === data.degree);
      if (idx > -1) {
        degreeIndex.value = idx;
      }
    }
    if (typeof index === "number") {
      editIndex.value = index;
    }
    uni.removeStorageSync("education_edit_data");
  }
});
</script>

<style lang="scss">
.education-edit {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .form-box {
    background-color: #fff;
    padding: 0 30rpx;
    margin-top: 20rpx;

    .form-item {
      display: flex;
      align-items: center;
      min-height: 100rpx;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #333;
      }

      .input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
      }

      .placeholder {
        color: #999;
      }

      .picker {
        flex: 1;
      }

      .picker-value {
        font-size: 28rpx;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .iconfont {
          font-size: 32rpx;
          color: #999;
        }
      }
    }
  }

  .submit-btn {
    position: fixed;
    left: 40rpx;
    right: 40rpx;
    bottom: 40rpx;
    height: 90rpx;
    background-color: #018eff;
    color: #fff;
    font-size: 32rpx;
    border-radius: 45rpx;
  }
}
</style>
