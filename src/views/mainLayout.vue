<template>
<div>
    <el-container>
        <el-header id="zxyaily-header">
            <div style="font-size: 20px;color: #c3bac3">这里是系统名</div>
            <div></div>
            <div>
                <el-dropdown>
                <div id="zxyaily-avatar" class="el-dropdown-link">
                    <el-avatar src="https://cdn.jsdelivr.net/gh/Bierxiensi/CDN/img/zxyaily/food.jpg"></el-avatar>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside id="zxyaily-aside" style="width: 260px ;min-width: 220px;">
                <el-menu
                    router
                    style="height: calc(100vh - 60px); background-color: #C0C4CC"
                    :default-active="$route.path"
                    class="el-menu-vertical-demo">
                    <el-submenu index="/">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>编辑管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="editor">editor编辑</el-menu-item>
                            <el-menu-item index="markdownEditor">markdown编辑</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/content">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>内容管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="article">文章管理</el-menu-item>
                            <el-menu-item index="tag">标签管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">统计管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <i class="el-icon-setting"></i>
                        <span slot="title">其他</span>
                    </el-menu-item>
                </el-menu>
<!--                <div id="zxyaily-menu">-->
<!--                    <div class="zxyaily-menu-item">-->
<!--                        <router-link to="/editor">编辑</router-link>-->
<!--                    </div>-->
<!--                    <div class="zxyaily-menu-item">-->
<!--                        <router-link to="/content">内容</router-link>-->
<!--                    </div>-->
<!--                </div>-->
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer id="zxyaily-footer">zxyaily@2019</el-footer>
            </el-container>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    name: "mainLayout"
}
</script>

<style scoped>

</style>
