<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/ColumnManagement' }">栏目管理</el-breadcrumb-item>
                        <el-breadcrumb-item>咨询类目</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-row>
                <el-table
                        :data="newList"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user_id"
                            label="添加用户"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="生成时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="open_DialogVisible(scope.$index, scope.row)">删除
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="资讯编辑" :visible.sync="dialogFormVisible">
                    <NewEdit  v-bind:new_id="new_id"></NewEdit>
                </el-dialog>

                <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                    <span>是否删除资讯</span>
                    <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="handleDelete()">确 定</el-button>
                            </span>
                </el-dialog>

            </el-row>
        </el-main>

    </el-container>

</template>

<script>

    /*引入公共样式*/
    import NewEdit from './newEdit.vue'

    export default {
        name: 'newList',
        components: {
            NewEdit
        },
        data() {
            return {
                newList: [],
                dialogVisible: false,
                new_id:'',
                loading: false,
                dialogFormVisible: false,
            }
        },
        mounted: function () {
            this.newdata();

        },
        methods: {
            newdata(){
                this.newList=[]
                this.loading = true
                this.$ajax({
                    method: 'get',
                    url: '/api/api/news/newList',
                }).then(response => {
                    var data = response.data.data.data
                    for (var i = 0; i < data.length; i++) {
                        this.newList.push({
                            'id': data[i].id,
                            'article_id': data[i].article_id,
                            'user_id': data[i].user_id,
                            'title': data[i].title,
                            'created_at': data[i].created_at
                        })
                    }
                    this.loading = false
                });
            },
            handleDelete() {
                this.$ajax({
                    method: 'get',
                    url: '/api/api/news/newDel?new_id='+this.new_id,
                }).then(res=> {
                    console.log(res);
                    this.$message.success("删除成功！");
                    this.newdata();
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error);
                });
                this.dialogVisible = false
                this.newdata()
            },
            open_DialogVisible(index, row){
                this.dialogVisible = true
                this.new_id=row.id
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleEdit(index, row) {
                this.new_id=row.id
                this.dialogFormVisible = true
            },
        }
    }
</script>