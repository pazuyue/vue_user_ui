<template>

    <el-container>
        <el-header>

            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/RoleList' }">工作台</el-breadcrumb-item>
                        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>

        </el-header>
        <el-main>

            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :model="form" status-icon :rules="rules2"  label-width="80px">
                        <el-form-item label="角色名称" prop="roleNmae">
                            <el-input v-model="form.roleNmae"></el-input>
                        </el-form-item>

                        <el-form-item label="创建时间">
                            <el-col :span="12">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.creat_date" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="角色简介" prop="desc">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="form.desc">
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

        name: 'RoleEdit',
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
                    roleNmae: '',
                    creat_date: '',
                    desc:'',
                },
                rules2: {
                    roleNmae: [
                        { validator: validate, trigger: 'blur' }
                    ],
                    desc: [
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
        },
    }
</script>

