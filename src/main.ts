import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupPermissionGuard } from './utils/permission'

export function createApp() {
	const app = createSSRApp(App)
	const pinia = createPinia()
	
	// 使用 Pinia
	app.use(pinia)
	
	// 初始化路由守卫
	setupPermissionGuard()
	
	return {
		app,
		pinia
	}
}