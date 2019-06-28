import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//页面引入
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage')
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const userInfo = r => require.ensure([], () => r(require('@/pages/userInfo')), 'userInfo')
const orderInfo = r => require.ensure([], () => r(require('@/pages/orderInfo')), 'orderInfo')
const transactionInfo = r => require.ensure([], () => r(require('@/pages/transactionInfo')), 'transactionInfo')
const goodsInfo = r => require.ensure([], () => r(require('@/pages/goodsInfo')), 'goodsInfo')
const commentInfo = r => require.ensure([], () => r(require('@/pages/commentInfo')), 'commentInfo')

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    children: [
      {
        path: '',
        component: home
      },
      {
        path: '/userInfo',
        component: userInfo,
        meta: ['YOU递', '用户信息']
      },
      {
        path: '/orderInfo',
        component: orderInfo,
        meta: ['YOU递', '订单信息']
      },
      {
        path: '/transactionInfo',
        component: transactionInfo,
        meta: ['YOU递', '交易信息']
      },
      {
        path: '/goodsInfo',
        component: goodsInfo,
        meta: ['YOU递', '商品信息']
      },
      {
        path: '/commentInfo',
        component: commentInfo,
        meta: ['YOU递社区', '用户发布信息']
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
