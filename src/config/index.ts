// 地图配置
export const MAP_CONFIG = {
  // 微信地图密钥 - 小程序端使用
  WX_MAP_KEY: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
  // 高德地图密钥 - App端使用
  AMAP_KEY: '1e300dfc6983c22c1583ac874d96ad74',
  // 腾讯地图密钥 - H5端使用
  QQ_MAP_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
}

// API配置
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api'
    : 'https://api.example.com',
  TIMEOUT: 10000
}

// 上传配置
export const UPLOAD_CONFIG = {
  IMAGE_URL: '/upload/image',
  FILE_URL: '/upload/file',
  MAX_SIZE: 5 * 1024 * 1024 // 5MB
}

// 缓存key配置
export const STORAGE_KEY = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  LOCATION: 'location'
} 