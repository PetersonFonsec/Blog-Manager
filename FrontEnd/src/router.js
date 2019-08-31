import Vue from 'vue'
import Router from 'vue-router'
import auth from './views/login.vue'
import article from './components/organisms/articles/o-form-view'

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
      path: '/article',
      name: 'article',
      component: article
    },
    /*{
      path: '/about',
      name: 'about',
      component: () => import( "about"  './views/About.vue')
    } */
  ]
})

// router.beforeEach((to, from, next) => {

// })

export default router