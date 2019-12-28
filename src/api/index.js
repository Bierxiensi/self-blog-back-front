import Axios from 'axios'
import Router from '../router'
import {Alert, Message} from 'element-ui'

function getAxios (config) {
    const axiosInstance = Axios.create(config)
    // axiosInstance.interceptors.request.use(function (config) {
    //     // intercept auth header here
    //     const token = localStorage.getItem('access_token')
    //     if (token) {
    //         config.headers.Authorization = `Bearer ${token}`
    //     }
    //     return config
    // })
    axiosInstance.interceptors.response.use(function (response) {
            if (response.data && response.data.code !== 0) {
                // this.$message.success(response.data.res)
            }
            if (response.status === 200) {
                return response.data
            } else if (response.status === 401){
                Router.push('/login')
                return Promise.reject(response)
            }else if (response.status === 404) {
                this.$message.error('404')
                // Message.error('404')
            }
        },
        function ({ response }) {
            if (!response) {
                alert('服务器拒绝请求')
                return
            }
            if (response.data && response.data.code !== 0) {
                console.log(response.data)
            }
            return Promise.reject(response.data.res)
        })
    return axiosInstance
}

export { getAxios }
