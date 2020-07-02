/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

// export default function (/* { store, ssrContext } */) {
//   const Router = new VueRouter({
//     scrollBehavior: () => ({ x: 0, y: 0 }),
//     routes,
//
//     // Leave these as is and change from quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     mode: process.env.VUE_ROUTER_MODE,
//     base: process.env.VUE_ROUTER_BASE
//   })
//
//   return Router
// }

const createRouter = () => new VueRouter({
  mode: 'history',
  // scrollBehavior: () => ({ x: 0, y: 0 }),
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
        // offset: { x: 0, y: 0 }
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,

})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// const Router = new VueRouter({
//   mode: 'history',
//   // scrollBehavior: () => ({ x: 0, y: 0 }),
//   scrollBehavior (to, from, savedPosition) {
//     if (to.hash) {
//       return {
//         selector: to.hash
//         // offset: { x: 0, y: 0 }
//       }
//     } else if (savedPosition) {
//       return savedPosition
//     } else {
//       return { x: 0, y: 0 }
//     }
//   },
//   routes,
//
// })
//
// export default Router
