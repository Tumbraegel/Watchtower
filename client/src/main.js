import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import 'jquery/src/jquery.js'

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:8000',
});

Vue.prototype.$http = http;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
