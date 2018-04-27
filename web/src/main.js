// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import VueSocketIO from 'vue-socket.io'
import VueSwing from 'vue-swing'
import VueCarousel from 'vue-carousel'

Vue.use(VueSocketIO, process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin)
Vue.use(VueMaterial)
Vue.component('vue-swing', VueSwing)
Vue.use(VueCarousel)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
