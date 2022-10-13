import Vue from 'vue'
import App from './App'
import qs from 'qs'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs //全局注册，使用方法为:this.qs
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    render: h => h(App)
}).$mount("#app")
