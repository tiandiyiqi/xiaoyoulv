<template>
  <view class="profile">
    <view class="header">
      <view class="avatar-box">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
        <view class="edit-avatar" @tap="handleChangeAvatar">
          <text class="iconfont icon-camera"></text>
        </view>
      </view>
    </view>

    <view class="form-box">
      <view class="form-item">
        <text class="label">昵称</text>
        <input
          class="input"
          type="text"
          v-model="form.nickname"
          placeholder="请输入昵称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">真实姓名</text>
        <input
          class="input"
          type="text"
          v-model="form.realName"
          placeholder="请输入真实姓名"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">性别</text>
        <picker
          class="picker"
          :range="genderOptions"
          range-key="label"
          :value="genderIndex"
          @change="handleGenderChange"
        >
          <view class="picker-value">
            {{ form.gender ? genderOptions[genderIndex].label : "请选择性别" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">手机号</text>
        <input
          class="input"
          type="number"
          v-model="form.phone"
          placeholder="请输入手机号"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">邮箱</text>
        <input
          class="input"
          type="text"
          v-model="form.email"
          placeholder="请输入邮箱"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">所在地</text>
        <picker mode="region" :value="form.region" @change="handleRegionChange">
          <view class="picker-value">
            {{ form.region.join(" ") || "请选择所在地" }}
            <text class="iconfont icon-arrow-right"></text>
          </view>
        </picker>
      </view>
    </view>

    <view class="education-box">
      <view class="section-title">
        <text class="text">教育经历</text>
        <view class="add-btn" @tap="handleAddEducation">
          <text class="iconfont icon-add"></text>
          添加
        </view>
      </view>

      <view
        v-for="(item, index) in form.education"
        :key="index"
        class="education-item"
      >
        <view class="school-info">
          <text class="school">{{ item.school }}</text>
          <text class="major">{{ item.major }}</text>
          <text class="degree">{{ item.degree }}</text>
        </view>
        <view class="time">{{ item.startYear }} - {{ item.endYear }}</view>
        <view class="actions">
          <text class="edit" @tap="handleEditEducation(index)">编辑</text>
          <text class="delete" @tap="handleDeleteEducation(index)">删除</text>
        </view>
      </view>
    </view>

    <view class="work-box">
      <view class="section-title">
        <text class="text">工作经历</text>
        <view class="add-btn" @tap="handleAddWork">
          <text class="iconfont icon-add"></text>
          添加
        </view>
      </view>

      <view v-for="(item, index) in form.work" :key="index" class="work-item">
        <view class="company-info">
          <text class="company">{{ item.company }}</text>
          <text class="position">{{ item.position }}</text>
        </view>
        <view class="time">{{ item.startDate }} - {{ item.endDate }}</view>
        <view class="actions">
          <text class="edit" @tap="handleEditWork(index)">编辑</text>
          <text class="delete" @tap="handleDeleteWork(index)">删除</text>
        </view>
      </view>
    </view>

    <button class="submit-btn" @tap="handleSave">保存</button>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

// 性别选项
const genderOptions = [
  { value: 1, label: "男" },
  { value: 2, label: "女" },
];

// 用户信息
const userInfo = reactive({
  avatar: "/static/avatar/default.png",
});

// 表单数据
const form = reactive({
  nickname: "",
  realName: "",
  gender: 0,
  phone: "",
  email: "",
  region: [] as string[],
  education: [] as {
    school: string;
    major: string;
    degree: string;
    startYear: string;
    endYear: string;
  }[],
  work: [] as {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
  }[],
});

// 性别选择器索引
const genderIndex = ref(0);

// 修改头像
const handleChangeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0];
      // TODO: 上传头像
      userInfo.avatar = tempFilePath;
    },
  });
};

// 性别选择
const handleGenderChange = (e: any) => {
  const index = e.detail.value;
  genderIndex.value = index;
  form.gender = genderOptions[index].value;
};

// 地区选择
const handleRegionChange = (e: any) => {
  form.region = e.detail.value;
};

// 添加教育经历
const handleAddEducation = () => {
  uni.navigateTo({
    url: "/pages/user/education/edit",
  });
};

// 编辑教育经历
const handleEditEducation = (index: number) => {
  uni.navigateTo({
    url: `/pages/user/education/edit?index=${index}`,
  });
};

// 删除教育经历
const handleDeleteEducation = (index: number) => {
  uni.showModal({
    title: "提示",
    content: "确定删除该教育经历？",
    success: (res) => {
      if (res.confirm) {
        form.education.splice(index, 1);
      }
    },
  });
};

// 添加工作经历
const handleAddWork = () => {
  uni.navigateTo({
    url: "/pages/user/work/edit",
  });
};

// 编辑工作经历
const handleEditWork = (index: number) => {
  uni.navigateTo({
    url: `/pages/user/work/edit?index=${index}`,
  });
};

// 删除工作经历
const handleDeleteWork = (index: number) => {
  uni.showModal({
    title: "提示",
    content: "确定删除该工作经历？",
    success: (res) => {
      if (res.confirm) {
        form.work.splice(index, 1);
      }
    },
  });
};

// 保存资料
const handleSave = async () => {
  try {
    // TODO: 调用保存接口
    uni.showLoading({
      title: "保存中...",
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    uni.hideLoading();
    uni.showToast({
      title: "保存成功",
      icon: "success",
    });

    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "保存失败",
      icon: "none",
    });
  }
};
</script>

<style lang="scss">
.profile {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;

  .header {
    height: 300rpx;
    background-color: #018eff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20rpx;

    .avatar-box {
      position: relative;
      width: 160rpx;
      height: 160rpx;

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 4rpx solid #fff;
      }

      .edit-avatar {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 48rpx;
        height: 48rpx;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

        .iconfont {
          font-size: 28rpx;
          color: #018eff;
        }
      }
    }
  }

  .form-box {
    background-color: #fff;
    padding: 0 30rpx;
    margin-bottom: 20rpx;

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

  .education-box,
  .work-box {
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;

    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;

      .text {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
      }

      .add-btn {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #018eff;

        .iconfont {
          font-size: 32rpx;
          margin-right: 4rpx;
        }
      }
    }

    .education-item,
    .work-item {
      padding: 20rpx;
      background-color: #f8f8f8;
      border-radius: 8rpx;
      margin-bottom: 20rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .school-info,
      .company-info {
        margin-bottom: 10rpx;

        .school,
        .company {
          font-size: 28rpx;
          color: #333;
          font-weight: bold;
          margin-right: 20rpx;
        }

        .major,
        .position {
          font-size: 26rpx;
          color: #666;
          margin-right: 20rpx;
        }

        .degree {
          font-size: 26rpx;
          color: #999;
        }
      }

      .time {
        font-size: 24rpx;
        color: #999;
        margin-bottom: 10rpx;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        font-size: 24rpx;

        .edit {
          color: #018eff;
          margin-right: 30rpx;
        }

        .delete {
          color: #f56c6c;
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
