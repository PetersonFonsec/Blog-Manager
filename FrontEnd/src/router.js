import Vue from 'vue'
import Router from 'vue-router'
import auth from './views/login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./components/templates/stats/t-dashboard'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue'),
    },
    {
      name: 'bArticles',
      path: '/blog/:id/articles',
      component: () => import('@/components/organisms/articles/o-form-view')
    },
  ]
})

// router.beforeEach((to, from, next) => {

// })

export default router