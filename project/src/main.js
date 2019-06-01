import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './style/index.styl'
import lodash from 'lodash'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '_', {value: lodash})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
