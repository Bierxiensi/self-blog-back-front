<template>
    <div class="zxyaily-card">
        <h5 style="text-align: center">内容编辑</h5>
        <el-form ref="articleForm" :model="articleForm" :rules="articleRule" label-width="80px">
            <el-form-item label="文章标题" prop="title">
                <el-input type="text" v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduce">
                <el-input type="text" v-model="articleForm.introduce"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <mavon-editor :ishljs="true" v-model="articleForm.content"/>
            </el-form-item>
            <el-form-item label="写作日期" prop="createTime">
                <div style="display: grid; grid-template-columns: 10vw 10vw; grid-gap: 1vw">
                    <DatePicker type="datetime" v-model="articleForm.createTime" value="yyyy-MM-dd HH:mm:ss" placeholder="日期" style="width: 200px"></DatePicker>
                </div>
            </el-form-item>
            {{articleForm.createTime}}
            <el-form-item label="标签" prop="tag">
                <el-select v-model="articleForm.tag" multiple class="select" placeholder="tag">
                    <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.tag"
                        :value="item.id">
                    </el-option>
                </el-select>
                {{articleForm.tag}}
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input type="text" v-model="articleForm.author"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSubmit('articleForm')">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import qs from 'qs'
import basicModalMixin from "@/mixins/basicModalMixin";
export default {
    name: "markdownEditor",
    mixins: [basicModalMixin],
    data () {
        return{
            tagList: '',
            articleForm:{
                title: 4,
                introduce: 'zxyaily',
                content: '亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤',
                tag: [],
                author: 'zxy',
                isMarkDownEditor: 1,
                createTime: '',
                updateTime: ''
            },
            articleRule: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '简介为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        async requestListData(){
            const { data: data } = await this.$api.tagApi.getTagsList(0, 999)
            this.tagList = data
            console.log(67, data)
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(94, this.articleForm)
                    this.$axios.post('http://127.0.0.1:5000/article/insertarticle', this.articleForm).then(res => {
                        console.log(58, res)
                        if (res.data.status === 200) {
                            this.$message({message: '亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤，我们的博客又有新内容咯', type:'success'})
                        } else if  (res.data.status === 0) {
                            this.$message.error('亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤，这里有一点问题呢，是不是文章内容过长，没办法添加到数据库哦，检查一下后台叭')
                        }
                    })
                } else {
                    this.$message.error('亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤，这里有一点问题呢，有信息没补全哦')
                }
            })
        }
    }
}
</script>

<style scoped>
</style>
