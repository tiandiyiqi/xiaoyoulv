<template>
  <view class="login">
    <view class="header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="title">玄鉴校友录</text>
      <text class="subtitle">连接校友，共创未来</text>
    </view>

    <view class="form-box">
      <view class="input-group">
        <text class="iconfont icon-user"></text>
        <input
          class="input"
          type="text"
          v-model="form.username"
          placeholder="手机号/邮箱"
          placeholder-class="placeholder"
        />
      </view>

      <view class="input-group">
        <text class="iconfont icon-lock"></text>
        <input
          class="input"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          placeholder="密码"
          placeholder-class="placeholder"
        />
        <text
          class="iconfont"
          :class="showPassword ? 'icon-eye' : 'icon-eye-close'"
          @tap="togglePasswordVisibility"
        ></text>
      </view>

      <view class="actions">
        <text class="forget-pwd" @tap="handleForgetPassword">忘记密码？</text>
      </view>

      <button class="submit-btn" @tap="handleLogin" :disabled="loading">
        {{ loading ? "登录中..." : "登录" }}
      </button>

      <view class="register-link">
        还没有账号？
        <text class="link" @tap="handleRegister">立即注册</text>
      </view>
    </view>

    <view class="third-party">
      <view class="divider">
        <text class="line"></text>
        <text class="text">其他登录方式</text>
        <text class="line"></text>
      </view>

      <view class="icons">
        <view class="icon-item" @tap="handleThirdPartyLogin('weixin')">
          <image
            class="icon-img"
            src="/static/images/wechat.jpeg"
            mode="aspectFill"
          />
          <text class="label">微信</text>
        </view>
        <view class="icon-item" @tap="handleThirdPartyLogin('qq')">
          <image
            class="icon-img"
            src="/static/images/qq.jpg"
            mode="aspectFill"
          />
          <text class="label">QQ</text>
        </view>
        <view class="icon-item" @tap="handleThirdPartyLogin('alipay')">
          <image
            class="icon-img"
            src="/static/images/zfb.jpg"
            mode="aspectFill"
          />
          <text class="label">支付宝</text>
        </view>
      </view>
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
  username: "",
  password: "",
});

// 是否显示密码
const showPassword = ref(false);

// 加载状态
const loading = ref(false);

// 切换密码显示状态
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// 处理登录
const handleLogin = async () => {
  if (!form.username || !form.password) {
    uni.showToast({
      title: "请输入账号和密码",
      icon: "none",
    });
    return;
  }

  loading.value = true;
  try {
    const success = await userStore.login(form.username, form.password);
    if (success) {
      uni.showToast({
        title: "登录成功",
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
        title: "登录失败",
        icon: "none",
      });
    }
  } catch (error) {
    uni.showToast({
      title: "登录失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};

// 处理注册
const handleRegister = () => {
  uni.navigateTo({
    url: "/pages/user/register/index",
  });
};

// 处理忘记密码
const handleForgetPassword = () => {
  uni.showToast({
    title: "忘记密码功能开发中",
    icon: "none",
  });
};

// 处理第三方登录
const handleThirdPartyLogin = (type: "weixin" | "qq" | "alipay") => {
  uni.showToast({
    title: `${type}登录功能开发中`,
    icon: "none",
  });
};
</script>

<style lang="scss">
.login {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  background-color: #fff;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;

    .logo {
      width: 320rpx;
      height: 320rpx;
      margin-bottom: 30rpx;
    }

    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rpx;
    }

    .subtitle {
      font-size: 32rpx;
      color: #666;
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
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40rpx;

      .forget-pwd {
        font-size: 28rpx;
        color: #999;
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

    .register-link {
      text-align: center;
      font-size: 28rpx;
      color: #999;

      .link {
        color: #018eff;
        margin-left: 10rpx;
      }
    }
  }

  .third-party {
    margin-top: 80rpx;

    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40rpx;

      .line {
        width: 100rpx;
        height: 1rpx;
        background-color: #eee;
      }

      .text {
        font-size: 24rpx;
        color: #999;
        margin: 0 20rpx;
      }
    }

    .icons {
      display: flex;
      justify-content: space-around;
      padding: 0 60rpx;

      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-img {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 10rpx;
          border-radius: 50%;
        }

        .label {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
}
</style>
