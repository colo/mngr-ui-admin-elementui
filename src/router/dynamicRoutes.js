
const dynamicRoutes = [
  {
    path: '/',
    component: () => import('@vue-element-admin/layout/index'),
    // redirect: '/dashboard',
    children: [{
      path: 'vhosts',
      name: 'Vhosts',
      component: () => import(/* webpackChunkName: "vhosts.all" */ '@apps/vhosts/index.vue'),
      meta: { title: 'Vhosts', icon: 'el-icon-link', roles: ['sysadmin'] }
    }]
  },
  // {
  //   path: '/vhosts',
  //   name: 'vhosts',
  //   component: () => import('@vue-element-admin/layout/index'),
  //   redirect: {name: 'vhosts_all'},
  //   alwaysShow: true,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //
  //   // meta: {
  //   //   breadcrumb: { label: 'Vhosts', icon: 'glyphicon glyphicon-link', navbar: true }
  //   // }
  //   meta: {
  //     title: 'Vhosts',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'vhosts_all',
  //       component: () => import(/* webpackChunkName: "vhosts.all" */ '@apps/vhosts/index.vue'),
  //       meta: { title: 'All', roles: ['sysadmin'] },
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: () => import('@vue-element-admin/layout/index'),
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@vue-element-admin/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1', roles: ['editor'] },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@vue-element-admin/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@vue-element-admin/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@vue-element-admin/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@vue-element-admin/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@vue-element-admin/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@vue-element-admin/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/external-link',
  //   component: () => import('@vue-element-admin/layout/index'),
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export default dynamicRoutes
