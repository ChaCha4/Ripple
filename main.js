import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from './store'
Vue.use(uView)
Vue.prototype.$store = store

// 阻止启动生产消息
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif