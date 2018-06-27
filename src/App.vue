<template>
  <div id="app">
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            v-bind:class="{ active: isActive }">
      <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">系统中心</template>
        <router-link to="/AdminList"><el-menu-item index="2-1">用户列表</el-menu-item></router-link>
       <!-- <router-link to="/RoleList"><el-menu-item index="2-3">角色列表</el-menu-item></router-link>
        <router-link to="/PermissionList"><el-menu-item index="2-4">权限列表</el-menu-item></router-link>-->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">我的工作台</template>
        <router-link to="/ColumnManagement"><el-menu-item index="3-1">栏目管理</el-menu-item></router-link>
      </el-submenu>

      <el-menu-item index="9">注销</el-menu-item>
    </el-menu>

    <router-view v-wechat-title='$route.meta.title' message="月光后台" v-on:child-say="Active"></router-view>

  </div>
</template>
<style>
  .active {
    display: none ;
  }
</style>
<script>
    import {delCookie} from './assets/js/cookie.js'
export default {
  name: 'App',
    data() {
        return {
            activeIndex: '1',
            isActive: false
        };
    },
    mounted() {
     this.routeUrl()
    },
    methods: {
        routeUrl(){
            if(this.$route.fullPath=="/ColumnManagement"){
               this.activeIndex='3-1'
            }
                },
        handleSelect(key, keyPath) {
            if(key==9){
                delCookie('username')
                this.$message.success("注销成功！");
                setTimeout(function(){
                    this.$router.push('/')
                }.bind(this),1000)
            }
        },
        Active(data){
            console.log(data)
           this.isActive=data
        }
    }
}
</script>

<style>
  a:-webkit-any-link{text-decoration:none}
</style>

