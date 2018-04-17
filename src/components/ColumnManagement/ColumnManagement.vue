<template>

        <el-row class="tac">

            <el-col :span="6">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="handselect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :collapse="isCollapse">

                    <el-menu-item index="1" v-if="isCollapse"  v-model="isCollapse">
                        <i class="el-icon-zoom-in"></i>
                        <span slot="title" :label="false">展开</span>
                    </el-menu-item>
                    <el-menu-item index="1" v-else="isCollapse"  v-model="isCollapse">
                        <i class="el-icon-zoom-out"></i>
                        <span slot="title" :label="true">收起</span>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>资讯管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">资讯栏目</template>
                            <el-menu-item index="2-1">资讯列表</el-menu-item>
                            <el-menu-item index="2-2">添加新闻</el-menu-item>
                        </el-menu-item-group>
                        <!--<el-submenu index="1-3">
                            <template slot="title">友情链接</template>
                            <el-menu-item index="1-3-1">选项1</el-menu-item>
                        </el-submenu>-->
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">广告管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="18">
                <addNewView  v-bind:user_id="2" v-if="menuViewID==2.2"></addNewView>
            </el-col>
        </el-row>




</template>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 700px;
    }
</style>
<script>
    import addNewView from './addNew.vue'
    /*引入公共样式*/

    export default {
        name: 'ColumnManagement',
        components: {
            addNewView
        },
        data() {
            return {
                isCollapse: true,
                menuViewID:''
            };
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handselect(key, keyPath) {
                if(key=='1'){
                    if(this.isCollapse){
                        this.isCollapse=false
                    }else {
                        this.isCollapse=true
                    }
                }
                else if(key=='2-2'){
                    this.menuViewID=2.2
                }
                else if(key=='3'){
                    this.menuViewID=1
                }else{
                    this.menuViewID=""
                }

            }

        }

    }
</script>