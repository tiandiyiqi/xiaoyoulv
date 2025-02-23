import { defineStore } from 'pinia'

interface UserInfo {
  id: string
  username: string
  nickname?: string
  avatar: string
  phone?: string
  email?: string
  realName?: string
  gender?: number
  region?: string[]
  education?: {
    school: string
    major: string
    degree: string
    startYear: string
    endYear: string
  }[]
  work?: {
    company: string
    position: string
    startDate: string
    endDate: string
    description?: string
  }[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: uni.getStorageSync('userInfo') || null as UserInfo | null,
    isLogin: false
  }),
  
  getters: {
    // 获取用户信息
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    
    // 获取登录状态
    getLoginStatus(): boolean {
      return this.isLogin
    }
  },
  
  actions: {
    // 设置 Token
    setToken(token: string) {
      this.token = token
      uni.setStorageSync('token', token)
    },
    
    // 设置用户信息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      this.isLogin = true
      uni.setStorageSync('userInfo', userInfo)
    },
    
    // 更新用户信息
    updateUserInfo(userInfo: Partial<UserInfo>) {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo }
        uni.setStorageSync('userInfo', this.userInfo)
      }
    },
    
    // 登录
    async login(username: string, password: string) {
      try {
        // TODO: 调用登录接口
        const res = await new Promise<{ token: string; userInfo: UserInfo }>(resolve => {
          setTimeout(() => {
            resolve({
              token: 'mock_token',
              userInfo: {
                id: '1',
                username: username,
                nickname: '张三',
                avatar: '/static/avatar/default.png'
              }
            })
          }, 1000)
        })
        
        this.setToken(res.token)
        this.setUserInfo(res.userInfo)
        return true
      } catch (error) {
        return false
      }
    },
    
    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = null
      this.isLogin = false
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
      
      // 跳转到登录页
      uni.reLaunch({
        url: '/pages/user/login/index'
      })
    },
    
    // 检查登录状态
    checkLogin(): boolean {
      const token = uni.getStorageSync('token')
      const userInfo = uni.getStorageSync('userInfo')
      
      if (token && userInfo) {
        this.token = token
        this.userInfo = userInfo
        this.isLogin = true
        return true
      }
      
      return false
    },
    
    // 获取用户信息
    async getUserProfile() {
      try {
        // TODO: 调用获取用户信息接口
        const res = await new Promise<UserInfo>(resolve => {
          setTimeout(() => {
            resolve({
              id: '1',
              username: 'zhangsan',
              nickname: '张三',
              avatar: '/static/avatar/default.png',
              phone: '13800138000',
              email: 'zhangsan@example.com',
              realName: '张三',
              gender: 1,
              region: ['广东省', '深圳市', '南山区'],
              education: [
                {
                  school: '深圳大学',
                  major: '计算机科学与技术',
                  degree: '本科',
                  startYear: '2016',
                  endYear: '2020'
                }
              ],
              work: [
                {
                  company: '腾讯科技',
                  position: '前端工程师',
                  startDate: '2020-07',
                  endDate: '2024-02',
                  description: '负责公司核心业务的前端开发工作'
                }
              ]
            })
          }, 1000)
        })
        
        this.setUserInfo(res)
        return true
      } catch (error) {
        return false
      }
    }
  }
}) 