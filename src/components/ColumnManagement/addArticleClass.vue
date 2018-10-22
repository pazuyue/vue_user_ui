<template>

    <el-container>
        <el-header>

            <el-row>
                <el-col :span="24" style="margin-top: 15px;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>工作台</el-breadcrumb-item>
                        <el-breadcrumb-item>类目添加</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>

        </el-header>
        <el-main>

            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :model="form" status-icon :rules="rules2" label-width="80px">
                        <el-form-item label="上级类目" prop="parentname">
                            <el-cascader
                                    :options="options"
                                    v-model="selectedOptions"
                                    change-on-select>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="类目" prop="email">
                            <el-input v-model="form.article_id"></el-input>
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





    export default {

        name: 'addArticleClass',
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
                    article_name:'',
                },
                options: [
                    {
                        value: '0',
                        label: '根类目',
                    },
                    {
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }]
                    }]
                    }],
                rules2: {
                    title: [
                        { validator: validate, trigger: 'blur' }
                    ],
                },
            }
        },
        mounted() {
        },
        methods: {


            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/api/api/news/saveNew',{
                            title:this.form.title,
                            article_id: this.form.article_id,
                            imageUrl: this.form.imageUrl,
                            content_info: this.form.content,
                        }).then(res=> {
                            this.$message.success("添加成功！");
                        }).catch(error => {

                            this.$message.error("添加失败");
                        });
                    } else {
                        this.$message.error("添加失败");
                        return false;
                    }
                });
            },
        },
    }
</script>
