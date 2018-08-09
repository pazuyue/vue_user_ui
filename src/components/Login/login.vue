<template>
    <div class="hello" >
        <h1>Vue-后端系统用户登陆</h1>
        <img src="../../assets/logo.png">

        <el-row  v-loading="loading">
            <el-col :span="8" :offset="8">

                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model.string="ruleForm2.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>

    </div>

</template>

<style>
    .hello {
        text-align: center;
    }
</style>


<script>
    import {setCookie,getCookie} from '../../assets/js/cookie.js'
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {ElRow}, data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
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
                ruleForm2: {
                    email:'',
                    password: '',
                },
                rules2: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    email: [
                        { validator: validate, trigger: 'blur' }
                    ]
                },
                loading: false,
            };
        },
        mounted(){
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            this.$emit('child-say',true);
            if(getCookie('username')){
                this.$emit('child-say',false);
                this.$router.push('/home')
            }
        },
        methods: {
            submitForm(formName) {
                this.loading= true,
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/api/api/auth/login',{
                            email:this.ruleForm2.email,
                            password:this.ruleForm2.password,
                        }).then(res=> {
                            if(res.data.code == 1) {

                                this.$message.success("登陆成功！");
                                this.$emit('child-say',false);
                                setCookie('username',this.ruleForm2.email,1000*60)
                                setTimeout(function(){
                                    this.loading= false,
                                    this.$router.push('/home')
                                }.bind(this),1000)
                            }else{
                                this.loading= false,
                                this.$message.error("登陆失败！");
                            }
                        }).catch(error => {
                            this.loading= false,
                            this.$message.error("登陆失败！");
                        });
                    } else {
                        this.loading= false,
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>