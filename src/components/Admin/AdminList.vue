<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>工作台</el-breadcrumb-item>
                        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
        </el-header>
        <el-main>

            <el-table
                    :data="tableData5"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户账号">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="用户ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="用户角色">
                                <span>{{ props.row.role }}</span>
                            </el-form-item>
                            <el-form-item label="邮箱地址">
                                <span>{{ props.row.email }}</span>
                            </el-form-item>
                            <el-form-item label="生成时间">
                                <span>{{ props.row.creat_time }}</span>
                            </el-form-item>
                            <el-form-item label="修改时间">
                                <span>{{ props.row.update_time }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="ID"
                        prop="id">
                </el-table-column>
                <el-table-column
                        label="账号"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="creat_time">
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
                <AdminEdit></AdminEdit>
            </el-dialog>

            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>这是一段信息</span>
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
    import AdminEdit from './AdminEdit.vue'

    export default {
        name: 'AdminList',
        components: {
            AdminEdit
        },
        data() {
            return {
                tableData5: [{
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    role: '管理员',
                    email: '284934551@qq.com',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔2',
                    role: '管理员',
                    email: '284934551@qq.com',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔3',
                    role: '管理员',
                    email: '284934551@qq.com',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔4',
                    role: '管理员',
                    email: '284934551@qq.com',
                    creat_time: '2018-03-28 16:59:00',
                    update_time: '2018-03-28 16:59:00',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                }],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                dialogVisible: false,
                user_id:'',
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