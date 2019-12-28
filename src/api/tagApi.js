let tagUrl = 'http://127.0.0.1:5000'
import { getAxios } from './index'

const axios = getAxios({
    baseURL: tagUrl
})

export default {
    getTagsList(currentPage, pageSize){
        return axios.get(`/tags/getAllTags?currentPage=${currentPage}&pageSize=${pageSize}`)
    },
    addTag(payload){
        return axios.post(`/tags/insertTag`, payload)
    },
    removeTagById(id){
        return axios.delete(`/tags/deleteTag/${id}`)
    },
    updateTagById(payload){
        return axios.post(`/tags/updateTag`, payload)
    }
}
