import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminAdd from '@/components/Admin/AdminAdd.vue'
import AdminList from '@/components/Admin/AdminList.vue'
import RoleList from '@/components/Role/RoleList.vue'
import RoleAdd from '@/components/Role/RoleAdd.vue'
import PermissionList from '@/components/permissions/PermissionList.vue'
import PermissionAdd from '@/components/permissions/PermissionAdd.vue'
import Login from '@/components/Login/Login.vue'
import ColumnManagement from '@/components/ColumnManagement/ColumnManagement.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'Login',
          component: Login,
          meta:{
              title:'登陆' // 标题设置在这里
          }
      },
      {
        path: '/home',
        name: 'HelloWorld',
        component: HelloWorld,
          meta:{
              title:'首页' // 标题设置在这里
          }
      },
      {
          path: '/AdminAdd',
          name: 'AdminAdd',
          component: AdminAdd,
          meta:{
              title:'用户添加' // 标题设置在这里
          }
      },
      {
          path: '/AdminList',
          name: 'AdminList',
          component: AdminList,
          meta:{
              requiresAuth: true,
              title:'用户列表' // 标题设置在这里
          }
      },
      {
          path: '/RoleList',
          name: 'RoleList',
          component: RoleList,
          meta:{
              requiresAuth: true,
              title:'角色列表' // 标题设置在这里
          }
      },
      {
          path: '/RoleAdd',
          name: 'RoleAdd',
          component: RoleAdd,
          meta:{
              requiresAuth: true,
              title:'添加角色' // 标题设置在这里
          }
      },
      {
          path: '/PermissionList',
          name: 'PermissionList',
          component: PermissionList,
          meta:{
              requiresAuth: true,
              title:'权限列表' // 标题设置在这里
          }
      },
      {
          path: '/PermissionAdd',
          name: 'PermissionAdd',
          component: PermissionAdd,
          meta:{
              requiresAuth: true,
              title:'权限添加' // 标题设置在这里
          }
      },
      {
          path: '/ColumnManagement',
          name: 'ColumnManagement',
          component: ColumnManagement,
          meta:{
              requiresAuth: true,
              title:'栏目管理' // 标题设置在这里
          }
      }


  ]
})
