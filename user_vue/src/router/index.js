import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from "../views/Register-Form.vue"
import Login from "../views/Login-Form.vue"
import Users from "../views/Users-Adm.vue"
import axios from "axios";
var req = require("../token/token")


function admAuth(to, from, next) {
  if (localStorage.getItem("token") != undefined) {
    // setando o token para enviar 
    // acessando o middlewer
    // segundo parametro e um dado q no caso e vazio
    // terveiro e o token, que deve ser setado deste jeito
    axios.post("http://localhost:1088/validate", {}, req).then(res => {
      console.log(res)
      next()
    }).catch(err => {
      console.log(err.response.data)
      next("/login")
    })

    // usuário nao tem token
  } else {
    next("/login")
  }
}

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
    beforeEnter: admAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
