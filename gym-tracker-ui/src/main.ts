import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css'
import importVantComponents from './importVantComponents'

const app = createApp(App)

importVantComponents(app)
app.mount('#app')
