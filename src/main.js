import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VeeValidate from 'vee-validate'
import en from 'vee-validate/dist/locale/en'

import VueBus from 'vue-bus'

Vue.use(VueBus)


const config = {
  locale: 'en',
  events: 'input|blur',
  dictionary: {en}
}
en.messages.required = () => 'this field is required'
en.messages.length = () => 'length is valid'

Vue.use(ElementUI)
Vue.use(VeeValidate, config)
Vue.config.productionTip = false

import MyPlugin from 'src/plugin'

Vue.use(MyPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
