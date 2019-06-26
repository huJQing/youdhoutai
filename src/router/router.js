import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//页面引入
import manage from '../pages/manage.vue'
import home from '../pages/home.vue'
import userInfo from '../pages/userInfo.vue'
import orderInfo from '../pages/orderInfo.vue'
import transactionInfo from '../pages/transactionInfo.vue'
import goodsInfo from '../pages/goodsInfo.vue'
import commentInfo from '../pages/commentInfo.vue'

const routes = [
  { path: '/', redirect: '/manage' },
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
