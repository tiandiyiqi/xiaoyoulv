import { useUserStore } from '@/stores/user'

// 不需要登录的页面
const whiteList = [
  '/pages/user/login/index',
  '/pages/user/register/index'
]

// 检查页面权限
export function checkPermission(path: string): boolean {
  // 获取用户状态
  const userStore = useUserStore()
  
  // 白名单中的页面不需要登录
  if (whiteList.includes(path)) {
    return true
  }
  
  // 检查登录状态
  if (!userStore.checkLogin()) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    
    // 跳转到登录页
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/user/login/index'
      })
    }, 1500)
    
    return false
  }
  
  return true
}

// 页面跳转拦截
export function setupPermissionGuard() {
  // 页面跳转前
  uni.addInterceptor('navigateTo', {
    invoke(params) {
      return checkPermission(params.url)
    }
  })
  
  uni.addInterceptor('redirectTo', {
    invoke(params) {
      return checkPermission(params.url)
    }
  })
  
  uni.addInterceptor('reLaunch', {
    invoke(params) {
      return checkPermission(params.url)
    }
  })
  
  uni.addInterceptor('switchTab', {
    invoke(params) {
      return checkPermission(params.url)
    }
  })
} 