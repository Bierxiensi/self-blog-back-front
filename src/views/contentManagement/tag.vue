<template>
    <div class="zxyaily-card">
        <h5>这里是内容</h5>
        <el-button type="primary" @click="handleAddTag">新增</el-button>
        <el-table :row-style="{height: '10px'}" v-loading="loadingRequest"
              element-loading-text="拼命加载中" :data="tableData" class="zxyaily-table"
              stripe :header-cell-style="headClass" >
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column label="tag">
                <template slot-scope="scope">
                    <el-input v-if="editIndex === scope.$index" v-model="editTag"></el-input>
                    <span v-else>{{scope.row.tag}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="editIndex === scope.$index">
                        <el-button size="mini" type="success" @click="handleSave(scope.row)">保存</el-button>
                        <el-button size="mini" type="" @click="editIndex = -1">取消</el-button>
                    </div>
                    <div v-else>
                        <el-button size="mini" type="" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="zxyaily-page" :total="total"
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentPageChange"
                background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <add-tag-modal ref="add-tag-modal"></add-tag-modal>
    </div>
</template>

<script>
import addTagModal from "./modal/addTagModal";
import pageMixins from "../../mixins/pageMixins";
import basicModalMixin from "../../mixins/basicModalMixin";
    export default {
        name: "tag",
        mixins: [pageMixins, basicModalMixin],
        components: {addTagModal},
        data(){
            return{
                editIndex: -1,  // 当前聚焦的输入框的行数
                editTag: '',
                loadingRequest: false,
                tableData:[]
            }
        },
        mounted(){
            this.requestListData()
        },
        methods:{
            async requestListData(){
                const { data: data, total:total } = await this.$api.tagApi.getTagsList(this.currentPage, this.pageSize)
                console.log(46, data, total)
                this.tableData = data
                this.total = total
            },
            handleAddTag(){
                let tagList = []
                this.tableData.forEach(item =>{
                    tagList.push(item.tag)
                })
                this.$refs['add-tag-modal'].Visible = true
                console.log(50, tagList)
                this.$refs['add-tag-modal'].tags = tagList
            },
            handleEdit (row, index) {
                this.editTag = row.tag;
                this.editIndex = index;
                console.log(76, this.editTag, this.editIndex)
            },
            async deleteData(tagId){
                const {status: status, msg: msg} = await this.$api.tagApi.removeTagById(tagId)
                if(status === 200){
                    this.$message.success(msg);
                } else {
                    this.$message.error(msg);
                }
                this.requestListData()
            },
            async handleSave(row){
                let payload = {
                    id: row.id,
                    tag: this.editTag
                }
                try {
                    const {status: status, msg: msg} = await this.$api.tagApi.updateTagById(payload)
                    if(status === 200){
                        this.$message.success(msg);
                    } else {
                        this.$message.error(msg);
                    }
                } finally {
                    setTimeout(() => { this.$router.go(0) }, 1200)
                }
            },
            headClass () {
                return 'background:#FAFAFAFF;color:#262626'
            },
            _pageSizeChanged () {},
            _pageChanged () {},
            _deleteById(){}
        }
    }
</script>

<style scoped>

</style>
