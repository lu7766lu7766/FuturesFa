import RoleConstant from 'ApiConstants/Role'

const type = {
  // mutation
  setInfo: 'User/setInfo',
  setOnline: 'User/setOnline',
  changePoint: 'User/changePoint',
  clearInfo: 'User/clearInfo'
  // action
  //
  // getters
}

export { type as UserType }

export default {
  namespaced: true,
  state: {
    info: {},
    online: {}
  },
  mutations: {
    setInfo(state, context) {
      state.info = context
    },
    setOnline(state, context)
    {
      state.online = context
    },
    changePoint(state, point) {
      state.info.point += point
    },
    clearInfo(state) {
      state.info = {}
    }
  }
}