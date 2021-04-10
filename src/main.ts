import 'vue-class-component/hooks'
import './class-component-hooks'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
