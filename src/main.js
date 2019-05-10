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
import en from 'vee-validate/dist/locale/en'

const config = {
  locale: 'en',
  events: 'input|blur',
  dictionary: {en},
  errorBagName: 'errorBags', // change if property conflicts.
  fieldsBagName: 'fieldBags'
}
en.messages.required = () => 'this field is required'
en.messages.length = () => 'length is valid'

Vue.use(VeeValidate, config)

import VueBus from 'vue-bus'

Vue.use(VueBus)



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
