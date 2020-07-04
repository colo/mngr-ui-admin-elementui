
const dynamicRoutes = [
  {
    name: 'system',
    path: '/system',
    component: () => import('@vue-element-admin/layout/index'),
    // component: () => import(/* webpackChunkName: "system" */ '@apps/system/index.vue'),
    redirect: { name: 'system_hosts' },
    // alwaysShow: true,
    meta: { title: 'System', icon: 'el-icon-link', roles: ['sysadmin'] },
    children: [
      {
        path: 'hosts',
        name: 'system_hosts',
        component: () => import(/* webpackChunkName: "system.hosts" */ '@apps/system/pages/hosts.vue'),
        meta: { title: 'Hosts', icon: 'el-icon-link' },
        // meta: {
        //   breadcrumb: { label: 'Hosts', icon: 'widgets', navbar: true }
        // },
        children: [
          {
            path: ':host',
            name: 'system_host',
            component: () => import(/* webpackChunkName: "system.host" */ '@apps/system/pages/host.vue'),
            hidden: true,
            meta: { title: 'Host', breadcrumb: false },
            // meta: {
            //   breadcrumb: { label: 'Host', icon: 'widgets' }
            // }
          }
        ]
      },
      {
        path: 'categories',
        name: 'system_categories',
        component: () => import(/* webpackChunkName: "system.hosts" */ '@apps/system/pages/categories.vue'),
        meta: { title: 'Categories', icon: 'el-icon-link' },
        // meta: {
        //   breadcrumb: { label: 'Categories', icon: 'widgets', navbar: true }
        // },
        // children: [
        //   {
        //     path: ':category',
        //     name: 'system_category',
        //     component: () => import(/* webpackChunkName: "system.category" */ '@apps/system/pages/category.vue'),
        //     meta: {
        //       breadcrumb: { label: 'Category', icon: 'widgets', app: 'system' }
        //     }
        //   }
        // ]
      }

    ]
  },
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
  {
    path: '/',
    component: () => import('@vue-element-admin/layout/index'),
    // redirect: '/dashboard',
    children: [{
      path: 'checks',
      name: 'Checks',
      component: () => import(/* webpackChunkName: "vhosts.all" */ '@apps/checks/index.vue'),
      meta: { title: 'Checks', icon: 'el-icon-check', roles: ['sysadmin'] }
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
