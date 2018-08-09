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
                                        :action="serverUrl"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                        :data="upLoadData">
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-col>
                        </el-form-item>


                        <el-form-item label="咨询内容" prop="desc">
                            <!-- 图片上传组件辅助-->
                            <el-upload
                                    class="avatar-uploader-quill-editor"
                                    :action="serverUrl"
                                    name="file"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadError"
                                    :before-upload="beforeUpload">
                            </el-upload>
                            <quill-editor
                                    v-model="detailContent"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    style="height: 250px"

                            >
                            </quill-editor>
                        </el-form-item>

                        <el-form-item style="margin-top: 140px;">
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

    import { quillEditor } from 'vue-quill-editor'

    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]


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
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: '/api/api/file/pustFile',  // 这里写你要上传的图片服务器地址
                //header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {

                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('.avatar-uploader-quill-editor input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },  // 富文本编辑器配置
                form: {
                    title: '',
                    imageUrl:'',
                    desc:'',
                },
                isCollapse:true,
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

        },
        methods: {
            // 上传图片前
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },
            // 上传图片成功
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功

                if (res.code === 1 && res.photo !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址

                    quill.insertEmbed(length, 'image',"http://www.zy.com/"+res.photo)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError(res, file) {
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },

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
