import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//页面引入
import manage from '../pages/manage.vue'
import home from '../pages/home.vue'
import userInfo from '../pages/userInfo.vue'

const routes = [
    {path: '/', redirect: '/manage'},
    {
        path: '/manage', 
        component: manage,
        name: '',
        children:[{
            path: '',
            component: home
        },{
            path: '/userInfo',
            component: userInfo,
            meta: ['YOU递','用户信息']
        }
        ]
    },
];

const router = new VueRouter({
    routes
});

export default router;
