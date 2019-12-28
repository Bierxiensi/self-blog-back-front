import Vue from 'vue'
import Router from 'vue-router'

import mainLayout from "./views/mainLayout";
import editor from "./components/editor";
import markdownEditor from "./components/markdownEditor";
import article from "./views/contentManagement/article";
import tag from "./views/contentManagement/tag";

Vue.use(Router)

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: mainLayout,
        redirect: '/editor',
        children:[{
            path: '/editor',
            component: editor
        },{
            path: '/markdownEditor',
            component: markdownEditor
        },{
            path: '/article',
            component: article
        },{
            path: '/tag',
            component: tag
        }]
    },
    ]
})
