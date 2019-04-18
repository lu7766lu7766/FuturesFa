import Vue from 'vue'
import Vuex from 'vuex'
import Login from './module/login'
import User from './module/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login,
    User
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [createPersistedState()]
})
