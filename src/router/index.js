import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import ChangePassword from '../views/ChangePassword'
import Main from '../views/Main'
import children from './children'
import outnetset from '../views/outnetset/index.vue'
import workmodeset from '../views/workmodeset'
import wireconfig from '../views/wireConfig'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/changepassword',
            name: 'changepassword',
            component: ChangePassword
        },
        {
            path: '/htmls',
            component: Main,
            children: children
        },
        {
            path: '/outnetset',
            name: 'outnetset',
            component: outnetset
        },
        {
            path: '/workmodeset',
            name: 'workmodeset',
            component: workmodeset
        },
        {
            path: '/changepassword',
            name: 'changepassword',
            meta: {
                title: '密码修改',
            },
            component: ChangePassword,
        },
        {
            path: '/wireconfig',
            name: 'wireconfig',
            meta: {
                title: '无线配置',
            },
            component: wireconfig
        }
    ]
})