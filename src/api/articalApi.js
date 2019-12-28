let articleUrl = 'http://127.0.0.1:5000'
import { getAxios } from './index'

const axios = getAxios({
    baseURL: articleUrl
})

export default {
    getArticleList(currentPage, pageSize){
        return axios.get(`/article/getAllArticleByPaginate?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    removeArticleById(articleId){
        return axios.delete(`/article/deleteArticle/${articleId}`)
    },
    updateArticle(payload){
        return axios.post(`/article/updateArticle/${payload.articleId}`, payload)
    }
}
