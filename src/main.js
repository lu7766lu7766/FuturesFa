import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

import VeeValidate from 'vee-validate'
import zh_TW from 'vee-validate/dist/locale/zh_TW'


const config = {
  locale: 'zh_TW',
  events: 'input|blur',
  dictionary: {zh_TW},
  errorBagName: 'errorBags', // change if property conflicts.
  fieldsBagName: 'fieldBags'
}
zh_TW.messages.required = () => '這個欄位是必填'
zh_TW.messages.length = () => '長度錯誤'

Vue.use(VeeValidate, config)

import VueBus from 'vue-bus'

Vue.use(VueBus)

import VCharts from 'v-charts'

Vue.use(VCharts)



Vue.config.productionTip = false

import MyPlugin from 'src/plugin'

Vue.use(MyPlugin)

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
