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
          path: '/',
          name: 'main',
          component: () => import('pages/Main/index')
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
