<template>

    <el-container>
        <el-header>

            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>工作台</el-breadcrumb-item>
                        <el-breadcrumb-item>新闻添加</el-breadcrumb-item>
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

                        <el-form-item label="图片上传" v-if="isCollapse">
                            <el-col :span="12">
                                <el-upload
                                        class="avatar-uploader"
                                        action="/api/api/xxxx/xxxxx"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                        :data="upLoadData">
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-col>
                        </el-form-item>


                        <el-form-item label="用户简介" prop="desc">
                            <div id="editorElem" style="text-align:left"></div>
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
    import E from 'wangeditor'
    export default {

        name: 'addNew',
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
                    title: '',
                    imageUrl:'',
                    desc:'',
                },
                isCollapse:false,
                upLoadData:{
                    fileName:this.new_id,
                },
                rules2: {
                    title: [
                        { validator: validate, trigger: 'blur' }
                    ],

                }
            }
        },
        mounted() {
            var editor = new E('#editorElem')
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }

            editor.create()
        },
        methods: {

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/api/api/xxx/xxxx',{
                            title:this.form.title,
                            desc: this.form.desc,
                        }).then(res=> {
                            this.$message.success("添加成功！");
                            this.$router.push({ path: 'AdminList' })
                        }).catch(error => {

                            this.$message.error("添加失败");
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                console.log(res)
                if(res.code==1){
                    this.form.imageUrl = URL.createObjectURL(file.raw);
                    this.form.trueImgUrl =res.photo
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
