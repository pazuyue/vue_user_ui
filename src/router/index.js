import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminAdd from '@/components/Admin/AdminAdd.vue'
import AdminList from '@/components/Admin/AdminList.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
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
              title:'用户列表' // 标题设置在这里
          }
      }

  ]
})
