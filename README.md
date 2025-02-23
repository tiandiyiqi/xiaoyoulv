# 玄鉴校友录

基于 uni-app + Vue3 + TypeScript + Vite + Pinia 的跨平台应用项目。

## 技术栈

- 框架：uni-app
- 前端框架：Vue 3
- 开发语言：TypeScript
- 构建工具：Vite
- 状态管理：Pinia
- CSS 预处理器：SCSS
- 包管理器：cnpm/npm

## 开发环境要求

- Node.js >= 16.0.0
- cnpm >= 8.0.0
- Vue 3.2.45
- TypeScript 4.9.4
- Vite 4.0.4

## 项目结构

```
src/
├── components/     # 公共组件
├── pages/         # 页面文件
├── static/        # 静态资源
├── stores/        # Pinia 状态管理
├── App.vue        # 应用入口组件
├── main.ts        # 应用入口文件
├── manifest.json  # uni-app 配置文件
├── pages.json     # 页面路由配置
└── uni.scss       # 全局样式变量
```

## 安装和使用

1. 安装依赖：

```bash
# 使用 cnpm 安装依赖
cnpm install
```

2. 开发运行：

```bash
# H5
cnpm run dev:h5

# 微信小程序
cnpm run dev:mp-weixin

# App
cnpm run dev:app
```

3. 打包构建：

```bash
# H5
cnpm run build:h5

# 微信小程序
cnpm run build:mp-weixin

# App
cnpm run build:app
```

## 支持平台

- H5
- 微信小程序
- 支付宝小程序
- 百度小程序
- 字节跳动小程序
- QQ小程序
- 快手小程序
- 飞书小程序
- Android App
- iOS App

## 开发注意事项

1. 样式开发
   - 使用 SCSS 预处理器
   - 全局变量定义在 `uni.scss`
   - 支持 rpx 单位（750rpx = 屏幕宽度）

2. TypeScript 支持
   - 确保添加适当的类型声明
   - 使用 `lang="ts"` 在 `<script>` 标签中

3. 状态管理
   - 使用 Pinia 进行状态管理
   - store 文件放在 `src/stores` 目录下

4. 路由配置
   - 在 `pages.json` 中配置页面路由
   - 第一项为应用启动页

## 常见问题

1. 依赖安装失败
   ```bash
   # 清除缓存后重新安装
   rm -rf node_modules package-lock.json
   cnpm install
   ```

2. 运行报错
   - 检查 Node.js 版本是否符合要求
   - 确保依赖版本兼容性
   - 查看控制台错误信息

## 更新日志

### v1.0.0 (2025-02-23)
- 项目初始化
- 基础框架搭建
- 开发环境配置
- 示例页面实现

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 发起 Pull Request

## 许可证

ISC License
