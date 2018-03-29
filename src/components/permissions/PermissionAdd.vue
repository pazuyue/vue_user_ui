<template>

    <el-container>
        <el-header>

            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/PermissionList' }">工作台</el-breadcrumb-item>
                        <el-breadcrumb-item>添加权限</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>

        </el-header>
        <el-main>

            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :model="form" status-icon :rules="rules2"  label-width="180px">

                        <el-form-item label="权限名称" prop="permission_name">
                            <el-input v-model="form.permission_name"></el-input>
                        </el-form-item>

                        <el-form-item label="父类ID" prop="fid">
                            <el-input v-model="form.fid"></el-input>
                        </el-form-item>

                        <el-form-item label="是否作为菜单显示" prop="is_menu">
                            <el-switch
                                    v-model="form.is_menu"
                                    active-text="是"
                                    inactive-text="否"
                            :clike="change(form.is_menu)">
                            </el-switch>
                        </el-form-item>

                        <el-form-item label="排序" prop="sort">
                            <el-input-number v-model="form.sort"  :min="1" :max="10" label="排序"></el-input-number>
                        </el-form-item>


                        <el-form-item label="创建时间">
                            <el-col :span="12">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.created_at" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="角色简介" prop="description">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="form.description">
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                <el-button type="primary" @click="submitForm('form')">确认</el-button>
                            </el-col>

                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>

</template>

<script>
    import '@/assets/css/AdminAdd.css'/*引入公共样式*/
    export default {

        name: 'RoleAdd',
        data() {
            var validate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('内容不能为空'));
                }else{
                    callback();
                }
            };
            return {
                form: {
                    permission_name: '',
                    fid: '',
                    is_menu:false,
                    sort:0,
                    created_at:'',
                    description:'',
                },
                rules2: {
                    permission_name: [
                        { validator: validate, trigger: 'blur' }
                    ],
                    description: [
                        { validator: validate, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            change(is_menu){
                console.log(is_menu);
            },
        },
    }
</script>