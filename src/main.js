import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import '@/assets/icons/iconfont.css'
Vue.config.productionTip = false
Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
new Vue({
    render: h => h(App)
}).$mount('#app')