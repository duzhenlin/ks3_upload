import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import Ks3 from './assets/ks3/src/ks3jssdk'
import '@/assets/icons/iconfont.css'
import "./assets/ks3/src/zh_CN"
Vue.prototype.$ks3 = Ks3;
Vue.config.productionTip = false
Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
new Vue({
    render: h => h(App)
}).$mount('#app')