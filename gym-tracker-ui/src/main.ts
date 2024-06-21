import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css'
import setupVant from './importVantComponents'
import router from './router'

const app = createApp(App)

setupVant()
app.use(router)
app.mount('#app')
