<template>
  <div id="app">
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <router-link to="/AdminList"><el-menu-item index="2-1">用户列表</el-menu-item></router-link>
        <router-link to="/RoleList"><el-menu-item index="2-2">角色列表</el-menu-item></router-link>
      </el-submenu>

    </el-menu>
    <router-view v-wechat-title='$route.meta.title' message="月光"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
        }
    }
}
</script>

<style>
  a:-webkit-any-link{text-decoration:none}
</style>

