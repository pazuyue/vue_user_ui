<template>
    <el-container>
        <el-header>
    <el-row>
        <el-col :span="24" style="margin-top: 15px;">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/PermissionList' }">工作台</el-breadcrumb-item>
                <el-breadcrumb-item>权限列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
    </el-row>


</el-header>
    <el-main>
        <el-row>
            <el-col :span="4"  :offset="20" style="margin-top: 15px;">
                <router-link to="/PermissionAdd"><el-button type="primary" round >添加权限</el-button></router-link>
            </el-col>
            <el-col :span="24"  style="margin-top: 15px;">

                <el-tree
                        :props="premission"
                        :load="loadNode"
                        lazy
                        @check-change="handleCheckChange"
                        :expand-on-click-node="false">

            <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>

              <el-button
                      type="text"
                      size="mini"
                      @click="">
            添加
          </el-button>&nbsp;
            <el-button
                    type="text"
                    size="mini"
                    @click="">
            修改
          </el-button>&nbsp;
            <el-button
                    type="text"
                    size="mini"
                    @click="">
            删除
          </el-button>&nbsp;

        </span>
      </span>
                </el-tree>

            </el-col>
        </el-row>



    </el-main>
    </el-container>

</template>
<style>
    .el-tree-node{ margin: 15px;}
</style>

<script>



    export default {
        name: 'PermissionsList',
        data() {
            return {
                premission: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },

            };
        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{ name: '监控' }]);
                }
                //if (node.level > 1) return resolve([]);
                var hasChild;
                var  data_node;
                if (node.data.name === '监控') {
                    hasChild = true;
                    data_node = [{
                        name: '脚本日志',
                        leaf: true
                    }, {
                        name: '队列监控',

                    },{
                        name: '缓存监控',
                        leaf: true
                    }]
                }
                if (node.data.name === '队列监控') {
                    hasChild = true;
                    data_node = [{
                        name: '查询',
                        leaf: true
                    }, {
                        name: '操作',
                        leaf: true
                    }]
                }
                console.log(data_node)
                setTimeout(() => {
                   if(hasChild){
                       var data = data_node;
                   }else {
                       var data =  [];
                   }

                    resolve(data);
                }, 500);
            }
        }
    }
</script>