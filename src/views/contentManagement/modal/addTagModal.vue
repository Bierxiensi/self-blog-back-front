<template>
    <div>
        <el-dialog :title="title" :visible.sync="Visible" center>
            <el-form ref="tagForm" label-width="80px">
                <el-form-item label="标签" prop="tag">
                    <el-tag
                        :key="tag"
                        v-for="tag in tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">{{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Visible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "addTagModal",
        data(){
            return{
                Visible: false,
                title: '标签',
                tags:[],
                inputVisible: false,
                inputValue: ''
            }
        },
        methods:{
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            async handleInputConfirm() {
                let payload = {
                    tag: this.inputValue
                }
                try{
                    let { status } = await this.$api.tagApi.addTag(payload)
                    if(status === 200){
                        this.$message.success('新增成功')
                    } else {
                        this.$message.error('添加失败')
                    }
                    this.inputVisible = false;
                    this.inputValue = '';
                } finally {
                    setTimeout(() => { this.$router.go(0) }, 1200)
                }
            }
        }
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
