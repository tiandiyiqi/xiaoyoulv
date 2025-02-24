// 地图配置
export const MAP_CONFIG = {
  // 高德地图 Web API key
  AMAP_KEY: 'b48c0555c931a556c2e4f9607da78276',
  // 高德地图安全密钥
  AMAP_SECURITY_KEY: '187f6d0e2e6f928e92adb8b74d5610e1',
  // 地图服务商
  PROVIDER: 'amap'
}

// API配置
export const API_CONFIG = {
  BASE_URL: typeof window !== 'undefined' && window.location.hostname === 'localhost'
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