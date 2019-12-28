import fa from "element-ui/src/locale/lang/fa";

export default {
    created () {
        this._requestListData()
    },
    data () {
        return{
            deleteTag: false,
            deleteId: 0,
            deleteIds: [],
            loadingRequest: false
        }
    },
    watch:{
        visible (newVal) {
            if (newVal === false) {
                this._safelyCallHook(this._onInvisible)
                this._safelyCallHook(this._reset)
            } else {
                this._safelyCallHook(this._onVisible)
            }
            this.$emit('input', newVal)
        },
        deleteTag(){
            this._safelyCallHook(this._deleteById)
            this._open()
        }
    },
    methods: {
        toggle () {
            this.visible = !this.visible
        },
        setTarget (items) {
            const _items = { ...items }
            Object.keys(_items).forEach(key => {
                this[key] = _items[key]
            })
        },
        _safelyCallHook (fn) {
            fn && fn instanceof Function && fn()
        },
        async _safelyAwaitFn (fn) {
            fn && fn instanceof Function && await fn()
        },
        async _requestListData () {
            this.loadingRequest = true
            try {
                await this._safelyAwaitFn(this.requestListData)
            } finally {
                this.loadingRequest = false
            }
        },
        _reset () {},
        _deleteById(){},
        _open() {
            this.$confirm('亲爱的艳子(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤，此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this._safelyAwaitFn(this.deleteData(this.deleteId))
                this._requestListData()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            this.deleteTag = false
        },
        handleDelete (id) {
            this.deleteTag = true
            if(typeof (id) === 'number'){
                this.deleteId = id
            } else {
                this.deleteIds = id
            }

        }
    }
}
