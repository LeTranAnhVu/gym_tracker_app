import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css'
import setupVant from './importVantComponents'

const app = createApp(App)

setupVant()
app.mount('#app')
