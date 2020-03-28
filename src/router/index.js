import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Create from '@/components/Create'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
          path: '/create',
          name: 'Create',
          component: Create
      },
      {
          path: '/login',
          name: 'Login',
          component: Login
      }
  ]
})
