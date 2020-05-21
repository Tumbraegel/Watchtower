import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

//https://vuejs.org/v2/cookbook/adding-instance-properties.html#Real-World-Example-Replacing-Vue-Resource-with-Axios

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:8000',
});

Vue.prototype.$http = http;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
