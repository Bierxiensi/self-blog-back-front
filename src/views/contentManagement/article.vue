<template>
    <div class="zxyaily-card">
        <h5>这里是内容</h5>
        <el-table :row-style="{height: '10px'}" v-loading="loadingRequest" element-loading-text="拼命加载中" :data="tableData" class="zxyaily-table" stripe>
            <el-table-column width="50" type="index"></el-table-column>
            <el-table-column prop="title" label="标题" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="introduce" label="简介" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="最近更新" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="作者" width="80">
                <template slot-scope="scope">
                    <i class="el-icon-s-custom"></i>
                    <span style="margin-left: 10px">{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="180">
                <template slot-scope="scope">
                    <el-tag type="info" v-for="Tag in scope.row.tag"  disable-transitions :key="Tag.id">{{Tag.tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="isMarkDownEditor" label="编辑器" width="180">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isMarkDownEditor === 1" disable-transitions>markDown</el-tag>
                    <el-tag v-else type="success" disable-transitions>富文本编辑</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="内容" show-overflow-tooltip>
                <template slot-scope="scope">
                    <VueMarkdown :source="scope.row.content" style="height: 80px"></VueMarkdown>
<!--                    <p v-html='scope.row.content' style="height: 80px"></p>-->
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                    @keydown.enter.native="handleSearch(scope)"
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字（标题、作者、日期、内容）搜索"/>
                </template>
                <template slot-scope="{ row }">
                    <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
                    <el-button size="mini" @click="handlePreview(row)">预览</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(row.articleId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="zxyaily-page"
            :total="total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <preview-dialog ref="preview-dialog"></preview-dialog>
        <edit-dialog ref="edit-dialog"></edit-dialog>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import pageMixins from "../../mixins/pageMixins";
import basicModalMixin from "../../mixins/basicModalMixin";
import editDialog from "./modal/editDialog";
import previewDialog from "./modal/previewDialog";
export default {
    mixins: [pageMixins, basicModalMixin],
    components: {previewDialog,editDialog,VueMarkdown},
    data() {
        return {
            search: '',
            tableData: [{
                createTime: '2019-13-14',
                author: 'zxyaily',
                content: '本地数据,亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤'
            }]
        }
    },
    // mounted(){
    //   this.requestListData()
    // },
    methods:{
        async requestListData(){
            const { data: data, total:total } = await this.$api.articalApi.getArticleList(this.currentPage, this.pageSize)
            this.tableData = data
            this.total = total
        },
        async handleSearch(scope) {console.log(scope, this.search),alert('搜索')},
        async deleteData (articleId) {
            const {status: status, msg: msg} = await this.$api.articalApi.removeArticleById(articleId)
            if(status === 200){
                this.$message({
                    message: msg,
                    type: 'success'
                });
            } else {
                this.$message.error(msg);
            }
            this.requestListData()
        },
        handleEdit(row){
            let tempTagArray = []
            row.tag.forEach(Tag => {
                tempTagArray.push(parseInt(Tag.id))
            })
            console.log(121, row)
            let modal = this.$refs['edit-dialog']
            modal.setTarget({
                articleForm: {
                    articleId: row.articleId,
                    introduce: row.introduce,
                    title: row.title,
                    content: row.content,
                    tag: tempTagArray,
                    author: row.author,
                    isMarkDownEditor: row.isMarkDownEditor,
                    createTime: row.createTime,
                    updateTime: row.updateTime
                }
            })
            modal.toggle()

            this.$refs['edit-dialog'].articleForm.tag = tempTagArray
            this.$refs['edit-dialog'].Visible = true
        },
        handlePreview(row){
            this.$refs['preview-dialog'].row = row
            this.$refs['preview-dialog'].dialogVisible = true
        },
        _pageSizeChanged () {},
        _pageChanged () {},
        _deleteById () {}
    }
}
</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
</style>
