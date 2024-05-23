import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import '../style/tailwind.css'
const app = createApp(App)
app.use(router).use(ElementPlus)
app.mount('#app')
