<template>
  <view class="register">
    <view class="header">
      <text class="title">注册账号</text>
      <text class="subtitle">填写以下信息完成注册</text>
    </view>

    <view class="form-box">
      <view class="input-group">
        <text class="iconfont icon-user"></text>
        <input
          class="input"
          type="text"
          v-model="form.username"
          placeholder="请输入手机号/邮箱"
          placeholder-class="placeholder"
        />
      </view>

      <view class="input-group" v-if="form.type === 'phone'">
        <text class="iconfont icon-message"></text>
        <input
          class="input"
          type="number"
          maxlength="6"
          v-model="form.code"
          placeholder="请输入验证码"
          placeholder-class="placeholder"
        />
        <text
          class="code-btn"
          :class="{ disabled: counting }"
          @tap="handleSendCode"
          >{{ counting ? `${countdown}s后重新获取` : "获取验证码" }}</text
        >
      </view>

      <view class="input-group">
        <text class="iconfont icon-lock"></text>
        <input
          class="input"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          placeholder="请设置密码"
          placeholder-class="placeholder"
        />
        <text
          class="iconfont"
          :class="showPassword ? 'icon-eye' : 'icon-eye-close'"
          @tap="togglePasswordVisibility"
        ></text>
      </view>

      <view class="input-group">
        <text class="iconfont icon-lock"></text>
        <input
          class="input"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="form.confirmPassword"
          placeholder="请确认密码"
          placeholder-class="placeholder"
        />
        <text
          class="iconfont"
          :class="showConfirmPassword ? 'icon-eye' : 'icon-eye-close'"
          @tap="toggleConfirmPasswordVisibility"
        ></text>
      </view>

      <view class="agreement">
        <checkbox
          :checked="form.agreement"
          @tap="form.agreement = !form.agreement"
          color="#018EFF"
        />
        <text class="text">
          我已阅读并同意
          <text class="link" @tap="handleViewAgreement">《用户协议》</text>
          和
          <text class="link" @tap="handleViewPrivacy">《隐私政策》</text>
        </text>
      </view>

      <button class="submit-btn" @tap="handleRegister" :disabled="loading">
        {{ loading ? "注册中..." : "注册" }}
      </button>

      <view class="login-link">
        已有账号？
        <text class="link" @tap="handleLogin">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";

// 用户状态管理
const userStore = useUserStore();

// 表单数据
const form = reactive({
  type: "phone" as "phone" | "email",
  username: "",
  code: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});

// 密码显示状态
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 验证码倒计时
const counting = ref(false);
const countdown = ref(60);
let timer: ReturnType<typeof setInterval>;

// 加载状态
const loading = ref(false);

// 切换密码显示状态
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// 发送验证码
const handleSendCode = () => {
  if (counting.value) return;
  if (!form.username) {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
    return;
  }

  // TODO: 调用发送验证码接口
  counting.value = true;
  timer = setInterval(() => {
    if (countdown.value <= 1) {
      clearInterval(timer);
      counting.value = false;
      countdown.value = 60;
    } else {
      countdown.value--;
    }
  }, 1000);

  uni.showToast({
    title: "验证码已发送",
    icon: "success",
  });
};

// 处理注册
const handleRegister = async () => {
  if (!form.username || !form.password || !form.confirmPassword) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }

  if (form.type === "phone" && !form.code) {
    uni.showToast({
      title: "请输入验证码",
      icon: "none",
    });
    return;
  }

  if (form.password !== form.confirmPassword) {
    uni.showToast({
      title: "两次密码输入不一致",
      icon: "none",
    });
    return;
  }

  if (!form.agreement) {
    uni.showToast({
      title: "请阅读并同意用户协议",
      icon: "none",
    });
    return;
  }

  loading.value = true;
  try {
    // 注册成功后自动登录
    const success = await userStore.login(form.username, form.password);
    if (success) {
      uni.showToast({
        title: "注册成功",
        icon: "success",
      });

      // 跳转到首页
      setTimeout(() => {
        uni.switchTab({
          url: "/pages/index/index",
        });
      }, 1500);
    } else {
      uni.showToast({
        title: "注册失败",
        icon: "none",
      });
    }
  } catch (error) {
    uni.showToast({
      title: "注册失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};

// 查看用户协议
const handleViewAgreement = () => {
  uni.showToast({
    title: "用户协议开发中",
    icon: "none",
  });
};

// 查看隐私政策
const handleViewPrivacy = () => {
  uni.showToast({
    title: "隐私政策开发中",
    icon: "none",
  });
};

// 跳转到登录页
const handleLogin = () => {
  uni.navigateBack();
};

// 组件销毁时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style lang="scss">
.register {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  background-color: #fff;

  .header {
    margin-bottom: 80rpx;

    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }

    .subtitle {
      font-size: 28rpx;
      color: #999;
    }
  }

  .form-box {
    .input-group {
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid #eee;
      margin-bottom: 20rpx;

      .iconfont {
        font-size: 40rpx;
        color: #999;
        margin-right: 20rpx;
      }

      .input {
        flex: 1;
        height: 100%;
        font-size: 32rpx;
      }

      .placeholder {
        color: #999;
      }

      .code-btn {
        font-size: 28rpx;
        color: #018eff;
        padding: 0 20rpx;

        &.disabled {
          color: #999;
        }
      }
    }

    .agreement {
      display: flex;
      align-items: center;
      margin: 40rpx 0;

      .text {
        font-size: 28rpx;
        color: #999;
        margin-left: 10rpx;
      }

      .link {
        color: #018eff;
      }
    }

    .submit-btn {
      width: 100%;
      height: 90rpx;
      background-color: #018eff;
      color: #fff;
      font-size: 32rpx;
      border-radius: 45rpx;
      margin-bottom: 30rpx;

      &[disabled] {
        opacity: 0.6;
      }
    }

    .login-link {
      text-align: center;
      font-size: 28rpx;
      color: #999;

      .link {
        color: #018eff;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
