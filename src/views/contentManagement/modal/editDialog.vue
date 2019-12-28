<template>
    <div>
        <el-dialog :title="title" :visible.sync="Visible" width="100%" fullscreen center>
            <!--<div ref="editor" id="editor"></div>-->
            <!--<span v-html="row.content"></span>-->
            <!--<mavon-editor :ishljs="true" v-model="articleForm.content"/>-->
            <!--<VueMarkdown :source="articleForm.content"></VueMarkdown>-->
            <!--<div v-else ref="editor" id="editor"></div>-->
            <el-form ref="articleForm" :model="articleForm" :rules="articleRule" label-width="80px">
                <el-form-item label="文章标题" prop="title">
                    <el-input type="text" v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduce">
                    <el-input type="text" v-model="articleForm.introduce"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <mavon-editor v-if="articleForm.isMarkDownEditor === 1" :ishljs="true" v-model="articleForm.content">markDown</mavon-editor>
                    <Editor v-else :on-change="onStemChange" ref="editor"></Editor>
                </el-form-item>
                <el-form-item label="更新日期" prop="createTime">
                    <div style="display: grid; grid-template-columns: 10vw 10vw; grid-gap: 1vw">
                        <DatePicker type="datetime" v-model="articleForm.updateTime" value="yyyy-MM-dd HH:mm:ss" placeholder="日期" style="width: 200px"></DatePicker>
                    </div>
                </el-form-item>
                <el-form-item label="标签" prop="tag">
                    <el-select v-model="articleForm.tag" multiple placeholder="tag">
                        <el-option
                            v-for="Tag in tagList"
                            :key="Tag.id"
                            :label="Tag.tag"
                            :value="Tag.id">
                        </el-option>
                    </el-select>
                    {{articleForm.tag}}
                </el-form-item>
<!--                <el-form-item label="标签" prop="tag">-->
<!--                    <el-select-->
<!--                            v-model="inputValue"-->
<!--                            size="small"-->
<!--                            @change="handleInputConfirm"-->
<!--                            class="select"-->
<!--                            placeholder="tag">-->
<!--                        <el-option-->
<!--                                v-for="Tag in tagList"-->
<!--                                :key="Tag.id"-->
<!--                                :label="Tag.tag"-->
<!--                                :value="Tag">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                    <el-card class="box-card">-->
<!--                        <el-tag-->
<!--                            :key="Tag.id"-->
<!--                            v-for="Tag in articleForm.tag"-->
<!--                            closable-->
<!--                            :disable-transitions="false"-->
<!--                            @close="handleClose(Tag.tag)">{{Tag.tag}}-->
<!--                        </el-tag>-->
<!--                    </el-card>-->
<!--                    <el-input-->
<!--                        class="input-new-tag"-->
<!--                        v-if="inputVisible"-->
<!--                        v-model="inputValue"-->
<!--                        ref="saveTagInput"-->
<!--                        size="small"-->
<!--                        @keyup.enter.native="handleInputConfirm"-->
<!--                        @blur="handleInputConfirm">-->
<!--                    </el-input>-->
<!--                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
<!--                </el-form-item>-->
                <el-form-item label="作者" prop="author">
                    <el-input type="text" v-model="articleForm.author"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Visible = false">取消</el-button>
                <el-button type="primary" @click="handleUpdate" :loading="loading">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import E from 'wangeditor'
import basicModalMixin from "@/mixins/basicModalMixin";
import Editor from '../../../components/wangEditor'
export default {
    name: "editDialog",
    mixins: [basicModalMixin],
    components: {Editor},
    watch: {
        Visible(newVal) {
            if (newVal === true) {
                console.log(94, this.articleForm)
                this.requestListData()
                if (this.articleForm.isMarkDownEditor === 0) {
                    console.log(this.articleForm.content)
                    this.$refs.editor.setHtml(this.articleForm.content)
                    // var editor = new E(this.$refs.editor)
                    // editor.customConfig.onchange = (html) => {
                    //     console.log(62, html)
                    //     this.articleForm.content = html
                    // }
                    // editor.create()
                    // this.$refs.editor.setData(this.articleForm.content)
                    // editor.txt.html(this.articleForm.content)
                    // this.initEditor()
                    // this.editor.clear();
                }
            }
        }
    },
    data(){
        return{
            loading: false,
            tagList: [],
            editor: null,
            title: '编辑',
            inputVisible: false,
            inputValue: '',
            articleForm: {
                articleId: 0,
                introduce: '',
                title: '',
                content: '',
                tag: [],
                author: '',
                isMarkDownEditor: 1,
                createTime: '',
                updateTime: ''
            },
            Visible: false,
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
        onStemChange (content) {
            this.articleForm.content = content
        },
        // handleClose(tag) {
        //     this.articleForm.tag.splice(this.articleForm.tag.indexOf(tag), 1);
        // },
        // showInput() {
            // this.inputVisible = true;
            // this.$nextTick(_ => {
            //     this.$refs.saveTagInput.$refs.input.focus();
            // });
        // },
        // handleInputConfirm() {
        //     let inputValue = this.inputValue;
        //     if (inputValue) {
        //         this.articleForm.tag.push(inputValue);
        //     }
            // this.inputVisible = false;
            // this.inputValue = '';
        // },
        async handleUpdate(){
            console.log(131, this.articleForm)
            this.loading = true
            let payload = {
                articleId: this.articleForm.articleId,
                introduce: this.articleForm.introduce,
                title: this.articleForm.title,
                content: this.articleForm.content,
                tag: this.articleForm.tag,
                author: this.articleForm.author,
                isMarkDownEditor: this.articleForm.isMarkDownEditor,
                createTime: this.articleForm.createTime,
                updateTime: this.articleForm.updateTime,
            }
            try{
                let { status, msg } = await this.$api.articalApi.updateArticle(payload)
                if(status === 200){
                    this.$message.success(msg)
                } else {
                    this.$message.error(msg)
                }
                // this.inputVisible = false;
                this.inputValue = '';
            } finally {
                this.loading = false
                setTimeout(() => { this.$router.go(0) }, 800)
            }
        }
    },
    _reset () {
        this.Visible = false
    },
}
</script>

<style scoped>
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
