import 'vue-class-component/hooks'
import './class-component-hooks'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App.vue'
import router from './router'

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000/api/v1'
axios.defaults.headers = { 'Content-Type': 'application/json' }

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
