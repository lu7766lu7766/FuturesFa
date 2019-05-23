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
          path: 'backend',
          component: () => import('pages/Main/Backend'),
          children: [
            {
              path: '/user-manage',
              name: 'user-manage',
              component: () => import('pages/Main/Backend/UserManage')
            }
          ]
        },
        {
          path: 'option',
          component: () => import('pages/Main/Option'),
          children: [
            {
              path: 'week-item',
              name: 'week-item',
              component: () => import('pages/Main/Option/WeekItem')
            },
            {
              path: 'month-item',
              name: 'month-item',
              component: () => import('pages/Main/Option/MonthItem')
            }
          ]
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
