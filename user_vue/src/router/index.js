import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from "../views/Register-Form.vue"
import Login from "../views/Login-Form.vue"
import Users from "../views/Users-Adm.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // ROTA PROTEGIDA
  {
    path: "/admin/user",
    name: "Users",
    component: Users,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("token") != undefined) {
        next()
      } else {
        next("/login")
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
