<template>
    <div>
        <el-dialog :title="row.title" :visible.sync="dialogVisible" width="60%" center>
            <VueMarkdown :source="row.content"></VueMarkdown>
            <template>

            </template>
<!--            <span v-html="row.content"></span>-->
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
    name: "previewDialog",
    components: {VueMarkdown},
    data() {
        return {
            dialogVisible: false,
            row: ''
        };
    },
    _reset () {
        this.dialogVisible = false
    },
}
</script>

<style scoped>

</style>
