import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('pages/Main'),
      children: [
        {
          path: '/user-manage',
          name: 'user-manage',
          component: () => import('pages/Main/Backend/UserManage')
        },
        {
          path: '/',
          name: 'index',
          component: () => import('pages/Main/index')
        },
        {
          path: '/history',
          name: 'history',
          component: () => import('pages/Main/History')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/Login')
    },
    {path: '*', redirect: '/login'}
  ]
})
