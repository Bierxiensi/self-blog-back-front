<template>
    <div>
        <div ref="editor" style="text-align:left;"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import { host } from '@/config/apiConfig'

    export default {
        name: 'wangEditor',
        props: {
            onChange: {
                type: Function
            },
            codeTemplate: {
                type: String
            }
        },
        data () {
            return {
                text: '',
                editor: null
            }
        },
        mounted () {
            this.editor = new E(this.$refs.editor)
            this.editor.customConfig.pasteFilterStyle = false
            this.editor.customConfig.zIndex = 100 // 设置 z-index 小于 999, 也就是 NavMenu 的 z-index
            this.editor.customConfig.menus = [
                'head', // 标题
                // 'bold', // 粗体
                // 'fontSize', // 字号
                // 'italic', // 斜体
                // 'underline', // 下划线
                // 'strikeThrough', // 删除线
                // 'foreColor', // 文字颜色
                // 'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                // 'justify', // 对齐方式
                'quote', // 引用
                'image', // 插入图片
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ]
            this.editor.customConfig.uploadImgServer = host + '/upload'
            this.editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    let url = result.res
                    insertImg(url)
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }
            this.editor.customConfig.uploadFileName = 'file'
            this.editor.customConfig.onchange = (html) => {
                this.onChange(html)
            }
            this.editor.create()
            this.editor.txt.html(this.codeTemplate)
        },
        methods: {
            setInitContent (html) {
                // console.log(72, html)
                this.editor.cmd.do('insertHTML', html)
            },
            setHtml (html) {
                console.log(74, html)
                this.editor.txt.html(html)
            },
            change () {
                this.text = this.editor.txt.text()
                return this.text
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 100%;
    }
</style>

