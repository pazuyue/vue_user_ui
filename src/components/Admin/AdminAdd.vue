<template>

    <el-container>
        <el-header>

            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/AdminList' }">系统中心</el-breadcrumb-item>
                        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>

        </el-header>
        <el-main>

            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :model="form" status-icon :rules="rules2" label-width="80px">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="password_confirmation">
                            <el-input type="password" v-model="form.password_confirmation" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="用户简介" prop="desc">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="form.desc">
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
    import qs from 'qs';
    export default {

        name: 'AdminAdd',
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.password_confirmation !== '') {
                        this.$refs.form.validateField('password_confirmation');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            var validate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('内容不能为空'));
                }else{
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    email:'',
                    password:'',
                    password_confirmation:'',
                    imageUrl:'',
                    desc:'',
                },

                rules2: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password_confirmation: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    name: [
                        { validator: validate, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validate, trigger: 'blur' }
                    ],
                }
            }
        },

        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/api/api/auth/userAdd',{
                            name:this.form.name,
                            email:this.form.email,
                            password: this.form.password,
                            password_confirmation: this.form.password_confirmation,
                            desc: this.form.desc,
                        }).then(res=> {
                            this.$message.success("添加成功！");
                            this.$router.push({ path: 'AdminList' })
                        }).catch(error => {

                            if(typeof(error.response.data.errors.email) !="undefined"){
                                this.$message.error(error.response.data.errors.email.toString());
                            }
                            if(typeof(error.response.data.errors.name) !="undefined"){
                                this.$message.error(error.response.data.errors.name.toString());
                            }
                            if(typeof(error.response.data.errors.password) !="undefined"){
                                this.$message.error(error.response.data.errors.password.toString());
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        },
    }
</script>

