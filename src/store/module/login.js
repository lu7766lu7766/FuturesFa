import router from 'src/router'

const type = {
  // mutation
  setAccessToken: 'Login/setAccessToken',
  clearAccessToken: 'Login/clearAccessToken',
  // action
  //
  // getters
  isLogin: 'Login/isLogin'
}

export { type as LoginType }

export default {
  namespaced: true,
  state: {
    type: null,
    token: null
  },
  mutations: {
    setAccessToken(state, context) {
      state.token = context.token
      state.type = context.type
    },
    clearAccessToken(state) {
      state.token = null
      state.type = null
      router.replace({name: 'login'})
    }
  },
  actions: {},
  getters: {
    isLogin: state => !!state.token
  }
}