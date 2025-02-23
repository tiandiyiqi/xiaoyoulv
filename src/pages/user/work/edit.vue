<template>
  <view class="work-edit">
    <view class="form-box">
      <view class="form-item">
        <text class="label">公司名称</text>
        <input
          class="input"
          type="text"
          v-model="form.company"
          placeholder="请输入公司名称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">职位</text>
        <input
          class="input"
          type="text"
          v-model="form.position"
          placeholder="请输入职位名称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">入职时间</text>
        <picker
          class="picker"
          mode="date"
          :value="form.startDate"
          @change="handleStartDateChange"
        >
          <view class="picker-value">
            {{ form.startDate || "请选择入职时间" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">离职时间</text>
        <picker
          class="picker"
          mode="date"
          :value="form.endDate"
          @change="handleEndDateChange"
        >
          <view class="picker-value">
            {{ form.endDate || "请选择离职时间" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">工作内容</text>
        <textarea
          class="textarea"
          v-model="form.description"
          placeholder="请输入工作内容描述"
          placeholder-class="placeholder"
        />
      </view>
    </view>

    <button class="submit-btn" @tap="handleSave">保存</button>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

// 表单数据
const form = reactive({
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
});

// 编辑的索引
const editIndex = ref(-1);

// 入职时间选择
const handleStartDateChange = (e: any) => {
  form.startDate = e.detail.value;
};

// 离职时间选择
const handleEndDateChange = (e: any) => {
  form.endDate = e.detail.value;
};

// 保存
const handleSave = () => {
  if (!form.company) {
    uni.showToast({
      title: "请输入公司名称",
      icon: "none",
    });
    return;
  }

  if (!form.position) {
    uni.showToast({
      title: "请输入职位名称",
      icon: "none",
    });
    return;
  }

  if (!form.startDate) {
    uni.showToast({
      title: "请选择入职时间",
      icon: "none",
    });
    return;
  }

  if (!form.endDate) {
    uni.showToast({
      title: "请选择离职时间",
      icon: "none",
    });
    return;
  }

  if (form.startDate > form.endDate) {
    uni.showToast({
      title: "入职时间不能大于离职时间",
      icon: "none",
    });
    return;
  }

  // 获取页面实例
  const pages = getCurrentPages();
  const prevPage = pages[pages.length - 2];

  // 更新上一页数据
  if (editIndex.value > -1) {
    prevPage.$vm.form.work[editIndex.value] = { ...form };
  } else {
    prevPage.$vm.form.work.push({ ...form });
  }

  uni.navigateBack();
};

onMounted(() => {
  // 获取编辑数据
  const query = uni.getStorageSync("work_edit_data");
  if (query) {
    const { index, data } = query;
    if (data) {
      Object.assign(form, data);
    }
    if (typeof index === "number") {
      editIndex.value = index;
    }
    uni.removeStorageSync("work_edit_data");
  }
});
</script>

<style lang="scss">
.work-edit {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .form-box {
    background-color: #fff;
    padding: 0 30rpx;
    margin-top: 20rpx;

    .form-item {
      display: flex;
      align-items: flex-start;
      min-height: 100rpx;
      border-bottom: 1rpx solid #eee;
      padding: 20rpx 0;

      &:last-child {
        border-bottom: none;
      }

      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #333;
        padding-top: 6rpx;
      }

      .input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
      }

      .textarea {
        flex: 1;
        height: 200rpx;
        font-size: 28rpx;
        line-height: 1.6;
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
