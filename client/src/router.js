import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/fb.js'
import Library from './views/Library.vue'
import Autarchs from './views/Autarchs.vue'
import ImportList from './views/ImportList.vue'
import PageNotFound from './views/PageNotFound.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Edit from './views/Edit.vue'
import Search from './views/Search.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      
      path: '',
      redirect: '/reading',
      meta: { requiresAuth: true }
    },
    {
      path: '/autarchs',
      component: Autarchs,
      redirect: '/reading',
      meta: { requiresAuth: true }
    },
    {
      path: '/import',
      component: ImportList,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false, showNav: false }
    },
    {
      path: '/signup',
      name: 'signup',
      //redirect: '/login',
      component: Signup,
      meta: { requiresAuth: false, showNav: false }
    },
    {
      path: '/edit/:novelID',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/:status(reading|completed|planned|dropped|paused)',
      component: Library,
      meta: { requiresAuth: true }
    },
    {
      path: '/all',
      redirect: '/reading'
    },
    {
      path: '/search',
      component: Search,
      meta: { requiesAuth: true }
    },
    {
      path: "*",
      component: PageNotFound,
      meta: { showNav: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  auth.onAuthStateChanged(user => {
    requiresAuth && !user ? next({path: '/login'}) : next()
    user && (to.name === 'login' || to.name === 'signup') ? next({path: '/autarchs'}) : next()
  })
});

export default router;