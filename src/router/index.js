import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '我们在街头',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: {
          title: '个人空间',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/banner', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/banner/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'Banner', // 路由名字
    meta: {
      title: '街头大屏幕', // 导航栏中菜单名字
      icon: 'el-icon-video-camera-solid', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/banner/list'),
        name: 'BannerList',
        meta: {
          title: '视频放送',
          roles: ['admin', 'mt']
        }
      },
      {
        path: 'upload',
        component: () => import('@/views/banner/upload'),
        name: 'BannerUpload',
        meta: {
          title: '视频上传',
          roles: ['admin', 'mt']
        }
      }
    ]
  },
  {
    path: '/activity', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/activity/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'Activity', // 路由名字
    meta: {
      title: '街头公告栏', // 导航栏中菜单名字
      icon: 'el-icon-data-analysis', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/activity/list'),
        name: 'ActivityList',
        meta: {
          title: '活动列表',
          roles: ['admin', 'mt']
        }
      },
      {
        path: 'signup',
        component: () => import('@/views/activity/signup'),
        name: 'Signup',
        meta: {
          title: '报名信息',
          roles: ['admin', 'mt']
        }
      }
    ]
  },
  {
    path: '/about', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/about/info', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'About', // 路由名字
    meta: {
      title: '街头历史书', // 导航栏中菜单名字
      icon: 'el-icon-notebook-2', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'info',
        component: () => import('@/views/about/info'),
        name: 'Info',
        meta: {
          title: '社团介绍',
          roles: ['admin', 'mt']
        }
      },
      {
        path: 'history',
        component: () => import('@/views/about/history'),
        name: 'History',
        meta: {
          title: '发展历史',
          roles: ['admin', 'mt']
        }
      }
    ]
  },
  {
    path: '/news', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/news/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'News', // 路由名字
    meta: {
      title: '街头黑板报', // 导航栏中菜单名字
      icon: 'el-icon-s-grid', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/news/list'),
        name: 'NewsList',
        meta: {
          title: '活动图文列表',
          roles: ['admin', 'mt']
        }
      },
      {
        path: 'create',
        component: () => import('@/views/news/create'),
        name: 'NewsCreate',
        meta: {
          title: '新建活动图文',
          roles: ['admin', 'mt']
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/news/edit'),
        name: 'NewsEdit',
        meta: {
          title: '编辑活动图文',
          noCache: true,
          activeMenu: '/news/list'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/photo', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/photo/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'Photo', // 路由名字
    meta: {
      title: '街头画廊', // 导航栏中菜单名字
      icon: 'el-icon-picture', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/photo/list'),
        name: 'PhotoList',
        meta: {
          title: '图片列表',
          roles: ['admin', 'mt']
        }
      },
      {
        path: 'upload',
        component: () => import('@/views/photo/upload'),
        name: 'PhotoUpload',
        meta: {
          title: '图片上传',
          roles: ['admin', 'mt']
        }
      }
    ]
  },
  {
    path: '/docs', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/docs/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'Docs', // 路由名字
    meta: {
      title: '街头档案馆', // 导航栏中菜单名字
      icon: 'el-icon-wallet', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/docs/list'),
        name: 'DocsList',
        meta: {
          title: '社团资料',
          roles: ['admin', 'mt']
        }
      }
    ]
  },
  {
    path: '/message', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/message/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'Message', // 路由名字
    meta: {
      title: '街头留言板', // 导航栏中菜单名字
      icon: 'el-icon-message', // 导航栏中菜单图标
      roles: ['admin', 'mt'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/message/list'),
        name: 'MessageList',
        meta: {
          title: '留言列表',
          roles: ['admin', 'mt']
        }
      }
    ]
  },
  {
    path: '/user', // 路由地址
    component: Layout, // 页面布局组件
    redirect: '/user/list', // 面包屑中重定向路由地址，若值为'noRedirect'则面包屑中不可点击
    alwaysShow: true, // 不管children菜单个数是不是1，导航栏都会显示一个可折叠的菜单，若值为false，则children个数为1时，导航栏会直接显示children菜单
    name: 'User', // 路由名字
    meta: {
      title: '街头人事科', // 导航栏中菜单名字
      icon: 'user', // 导航栏中菜单图标
      roles: ['admin'] // 配置权限
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: {
          title: '用户列表',
          roles: ['admin']
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/user/permission'),
        name: 'Permission',
        meta: {
          title: '权限设置',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/user/role'),
        name: 'Role',
        meta: {
          title: '角色设置',
          roles: ['admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
