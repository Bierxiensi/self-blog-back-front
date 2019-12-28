import Vue from 'vue'
import App from './App.vue'
import router from './router'
// <!-- 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入组件库
import ElementUI from 'element-ui'
import './themes/element-variables.scss'
import './themes/index.scss'
//
import ViewUI from 'view-design';
// import style
import 'view-design/dist/styles/iview.css';

import axios from 'axios'

// mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import articalApi from "./api/articalApi";
import tagApi from "./api/tagApi";
Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(ViewUI);
Vue.prototype.$axios = axios
Vue.prototype.$api = {
  articalApi,
  tagApi
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
