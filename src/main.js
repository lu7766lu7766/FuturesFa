import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import BootstrapVue from 'bootstrap-vue'
//
// Vue.use(BootstrapVue)
import { NavbarPlugin, FormGroupPlugin, FormCheckboxPlugin } from 'bootstrap-vue/es/components'

Vue.use(NavbarPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormCheckboxPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import iView from 'iview'

Vue.use(iView)
// import { Button, Option, Select, Form, FormItem, Card, Input, Modal, DatePicker, Message } from 'iview'
//
// Vue.component('Button', Button)
// Vue.component('Option', Option)
// Vue.component('Select', Select)
// Vue.component('Form', Form)
// Vue.component('FormItem', FormItem)
// Vue.component('Card', Card)
// Vue.component('Input', Input)
// Vue.component('Modal', Modal)
// Vue.component('DatePicker', DatePicker)
import 'iview/dist/styles/iview.css'

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
// import VeLine from 'v-charts/lib/line.common'
// import VeHistogram from 'v-charts/lib/histogram.common'
//
// Vue.component(VeLine.name, VeLine)
// Vue.component(VeHistogram.name, VeHistogram)


Vue.config.productionTip = false

import MyPlugin from 'src/plugin'

Vue.use(MyPlugin)

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

// Vue.config.errorHandler = (err, vm, info) =>
// {
//   // console.log('[ERROR CATCH]: ', err)
//   // console.log('[ERROR COMPONENT]: ', vm)
//   // console.log('[ERROR INFO]: ', info)
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
