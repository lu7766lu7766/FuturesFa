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
              path: 'user-manage',
              name: 'user-manage',
              component: () => import('pages/Main/Backend/UserManage')
            },
            {
              path: 'account-manage',
              name: 'account-manage',
              component: () => import('pages/Main/Backend/AccountManage')
            },
            {
              path: 'sys-manage',
              name: 'sys-manage',
              component: () => import('pages/Main/Backend/SysManage')
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
            },
            {
              path: 'quotation',
              name: 'quotation',
              component: () => import('pages/Main/Option/Quotation')
            },
            {
              path: 'volume-and-price',
              name: 'volume-and-price',
              component: () => import('pages/Main/Option/VolumeAndPrice')
            }
          ]
        },
        {
          path: 'history-analysis',
          name: 'history-analysis',
          component: () => import('pages/Main/HistoryAnalysis')
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
