import Vue from "vue"
import Router from "vue-router"
import auth from "./views/login.vue"
import Auth from './controller/auth'
import { userKey } from './global'

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "auth",
      path: "/auth",
      component: auth,
      meta: { requiresAuth: false }
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: () => import("./views/dashboard"),
      meta: { requiresAuth: true }
    },
    {
      name: "profile",
      path: "/profile",
      component: () => import("./views/Profile"),
      meta: { requiresAuth: true }
    },
    {
      name: "blog",
      path: "/blog",
      component: () => import("./views/Blog"),
      meta: { requiresAuth: true }
    },
    {
      name: "ListAuthores",
      path: "/blog/:id/authores",
      component: () => import("@/components/blogs/organisms/o-list-authores"),
      meta: { requiresAuth: true }
    },
    {
      name: "CreateArticles",
      path: "/blog/:id/articles",
      component: () => import("@/components/articles/o-form-view"),
      meta: { requiresAuth: true },
    },
    {
      name: "articles",
      path: "/articles",
      component: () => import("@/components/articles/o-list"),
      meta: { requiresAuth: true }
    },
    {
      name: "UpdateArticles",
      path: "/UpdateArticles",
      component: () => import("@/components/articles/o-form-view"),
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach( async (to, from, next) => {
  
  const { requiresAuth } = to.meta

  if(!requiresAuth) return next()

  const res = await Auth.validToken()
  
  if(res.success) return next()

  localStorage.removeItem(userKey)

  return next({ path:'/auth'})

 })

export default router