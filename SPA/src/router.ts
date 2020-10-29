import Vue from 'vue'
import Router from 'vue-router'

import DashBoard from '@/pages/dashboard/dashboard.vue'
import OrderReview from '@/pages/orderReview/orderReview.vue'
import OrderPayment from '@/pages/orderPayment/orderpayment.vue'

Vue.use(Router)

const router = new Router({
  base: '/pages/',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoard,
    },
    {
      path: '/orderreview',
      name: 'orderreview',
      component: OrderReview,
    },
    {
      path: '/orderpayment/:id',
      name: 'orderpayment',
      component: OrderPayment,
    },
  ],
})

export default router
