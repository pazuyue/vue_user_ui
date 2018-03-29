<template>
    <el-container>
        <el-header>
    <el-row>
        <el-col :span="24" style="margin-top: 15px;">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/AdminList' }">工作台</el-breadcrumb-item>
                <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
    </el-row>


</el-header>
    <el-main>

        <el-row>
            <el-col :span="2"  :offset="20" style="margin-top: 15px;">
                <router-link to="/RoleAdd"><el-button type="primary" round >添加角色</el-button></router-link>
            </el-col>
        </el-row>
        <el-table
                :data="role_list"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="角色ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="角色名称">
                            <span>{{ props.row.role_name }}</span>
                        </el-form-item>
                        <el-form-item label="角色状态">
                            <span>{{ props.row.state }}</span>
                        </el-form-item>
                        <el-form-item label="生成时间">
                            <span>{{ props.row.creat_time }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ props.row.update_time }}</span>
                        </el-form-item>
                        <el-form-item label="角色描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="ID"
                    prop="role_name"
                    align="left">
            </el-table-column>
            <el-table-column
                    label="角色名称"
                    prop="role_name"
                    align="left">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="state"
                    align="left">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="creat_time"
                    align="left">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="dialogFormVisible = true">
                        编辑
                    </el-button>

                    <el-button type="danger" size="mini" @click="open_DialogVisible(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
            <RoleEdit></RoleEdit>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>是否确认删除改用户</span>
            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="handleDelete()">确 定</el-button>
                            </span>
        </el-dialog>

    </el-main>
    </el-container>

</template>

<script>
    import '@/assets/css/AdminList.css'
    /*引入公共样式*/
    import RoleEdit from './RoleEdit.vue'

    export default {
        name: 'RoleList',
        components: {
            RoleEdit
        },
        data() {
            return {
                role_list: [{
                    id: '12987122',
                    role_name: '管理员',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    state:'正常',
                    desc: '系统管理员',

                }, {
                    id: '12987123',
                    role_name: '管理员',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    state:'正常',
                    desc: '系统管理员',
                }, {
                    id: '12987125',
                    role_name: '管理员',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    state:'正常',
                    desc: '系统管理员',
                }, {
                    id: '12987126',
                    role_name: '管理员',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    state:'正常',
                    desc: '系统管理员',
                }],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                dialogVisible: false,
                role_id:'',
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete() {
                console.log(this.user_id);
            },
            open_DialogVisible(index, row){
                this.dialogVisible=true
                this.user_id=row.id
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>