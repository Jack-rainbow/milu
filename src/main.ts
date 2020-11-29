import { createApp } from 'vue'
import axios from 'axios'

import router from './router'
import store from './store'
import App from './App.vue'
// 全局 引入 ant 组件
import Antd from "./utils/ant"

// css
import '@/assets/scss/main.scss'

const app = createApp(App)
app.config.productionTip = false

app.config.globalProperties.$axios = axios

app.use(store).use(router).use(Antd).mount('#app')
