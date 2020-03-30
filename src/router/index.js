import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Create from '@/components/Create'
import Login from '@/components/Login'
import Edit from '@/components/Edit'

//import {store} from './store';


Vue.use(Router);



export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/create',
            name: 'Create',
            component: Create,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/edit/:id',
            name: 'Edit',
            component: Edit,
            meta: {
                requiresAuth: true
            }
        }

  ]
})
