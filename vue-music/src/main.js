import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import VConsole from 'vconsole'

import 'common/stylus/index.styl'

// eslint-disable-next-line no-unused-vars
var vConsole = new VConsole()

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
