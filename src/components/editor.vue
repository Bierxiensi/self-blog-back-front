<template>
    <div  class="demo-split">
        <Split v-model="split" min="800px" max="140px">
            <div slot="left" class="demo-split-pane">
                <h5 style="text-align: center">内容编辑</h5>
                <el-form ref="articleForm" :model="articleForm" :rules="articleRule" label-width="80px">
                    <el-form-item label="文章标题" prop="title">
                        <el-input type="text" v-model="articleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="introduce">
                        <el-input type="text" v-model="articleForm.introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <div ref="editor" id="editor"></div>
                    </el-form-item>
                    <el-form-item label="写作日期" prop="createTime">
                        <div style="display: grid; grid-template-columns: 10vw 10vw; grid-gap: 1vw">
                            <DatePicker type="datetime" v-model="articleForm.createTime" value="yyyy-MM-dd HH:mm:ss" placeholder="日期" style="width: 200px"></DatePicker>
                        </div>
                    </el-form-item>
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
            <div slot="right" class="demo-split-pane">
                <div>
                    <h5 style="text-align: center">内容预览</h5>
                    <div class="zxyaily-scrollbar" style="" v-html="articleForm.content"></div>
                </div>
            </div>
        </Split>
    </div>
</template>

<script>
import basicModalMixin from "@/mixins/basicModalMixin";
import E from 'wangeditor'
import qs from 'qs'
export default {
    name: 'editor',
    mixins: [basicModalMixin],
    data () {
        return {
            tagList: '',
            inputVisible: false,
            split: 0.618,
            articleForm: {
                title: '',
                introduce: 'zxyaily',
                content: '亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤',
                tag: ['zxyaily'],
                author: 'zxy',
                isMarkDownEditor: 0,
                createTime: '',
                updateTime: ''
            },
            editorContent: '',
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
    methods: {
        async requestListData(){
            const { data: data } = await this.$api.tagApi.getTagsList(0, 999)
            this.tagList = data
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                console.log(69, valid)
                if (valid) {
                    this.$axios({
                        method: 'POST',
                        url: 'http://127.0.0.1:5000/article/insertarticle',
                        data: qs.stringify(this.articleForm)
                        // headers: {
                        //   Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        //   Accept: 'application/json'
                        // },
                        /** method 2 ,submit a form
                         * data: {
                            articalId: this.articalForm.title,
                            title: this.articalForm.title,
                            content: this.articalForm.content,
                            tag: this.articalForm.tag,
                            createTime: '1997-11-08',
                            updateTime: '2019-09-18',
                            createPeople: this.articalForm.createPeople
                         },
                         transformRequest: [function (data) {
                            data = qs.stringify(data)
                            return data
                          }]
                         *
                         **/
                        /** submit params in url
                         * params: {
                            articalId: this.articalForm.title,
                            title: this.articalForm.title,
                            content: this.articalForm.content,
                            tag: this.articalForm.tag,
                            createTime: '1997-11-08',
                            updateTime: '2019-09-18',
                            createPeople: this.articalForm.createPeople
                          }
                         *
                         **/
                    }).then(res => {
                        // console.log(58, res)
                        if (res.data.status === 200) {
                            this.$message({message: '上传成功', type:'success'})
                        }
                    })
                } else {
                    this.$message.error('亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤，还咩有补全信息')
                }
            })
        }
    },
    mounted () {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
            this.articleForm.content = html
        }
        editor.create()
        editor.txt.html(this.articleForm.content)
    }
}
</script>

<style scoped>
    .demo-split{
        height: calc(100vh - 160px);
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
    #editor  {
        text-align:left;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>

