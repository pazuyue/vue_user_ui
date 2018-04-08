<template>

    <el-container>
        <el-header>

            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/AdminList' }">工作台</el-breadcrumb-item>
                        <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>

        </el-header>
        <el-main>

            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :model="form" status-icon :rules="rules2" label-width="80px" v-loading="loading">
                        <el-form-item label="用户名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="form.password_confirmation" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="头像上传">
                            <el-col :span="12">
                                <el-upload
                                        class="avatar-uploader"
                                        action="http://localhost/vue/phpfunction/upload.php"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-col>
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
                            <el-col :xs="12" :sm="6" :md="4" :lg="8" :xl="1">
                                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        name: 'AdminEdit',
        props: ['user_id'],
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
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
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                loading:false,
            }
        },
        watch:{
            user_id(){
                this.userdata()
            }
        },
        mounted: function() {
            this.userdata()
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            userdata(){
                this.loading=true
                this.userList=[]
                this.$ajax({
                    method: 'get',
                    url: '/api/api/auth/userEdit?userid='+this.user_id,
                }).then(response => {
                    var data =response.data
                    console.log(data.data);
                    this.form.name=data.data.name
                    this.form.email=data.data.email
                    this.form.password=data.data.password
                    this.form.password_confirmation=data.data.password
                    this.form.imageUrl=data.data.imageUrl
                    this.form.desc=data.data.portrait

                    this.loading=false
                });
            },
            handleAvatarSuccess(res, file) {
                if(res.code==1){
                    this.form.imageUrl = URL.createObjectURL(file.raw);
                }else {
                    this.$message.error('上传失败!');
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

        },
    }
</script>