import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/styles/index.scss' // global css
import App from './App.vue'
import store from './store'
import router from './router'
import '@/permission'
import '@/utils/error-log'
import '@/services/storage'
import * as filters from './filters' // global filters
import * as globalMethods from '@/utils/globalMethods'

Vue.use(ElementUI)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(globalMethods).forEach(key => {
  Vue.prototype[key] = globalMethods[key];
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
