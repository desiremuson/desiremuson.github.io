import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewAccount from '../views/ViewAccount'
import Withdraw from '../views/Withdraw'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/:account_number',
    name: 'viewAccount',
    component: ViewAccount
  },
  {
    path: '/withdraw/:account_number',
    name: 'withdraw',
    component: Withdraw
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
