import axios, { AxiosError } from 'axios'
import { AxiosResponse } from 'axios'

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    // baseURL: '/',
    baseURL: 'https://auto.5ibug.net/',
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
    if(error.request.status === 401){
        // 登录失效
        localStorage.removeItem("token")
        history.go(0)
    }
    return Promise.reject(error)
}


// request interceptor
request.interceptors.request.use(config => {
    // 全局转圈圈

    const token = localStorage.getItem("token")
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {
    const { data } = response

    if(data.code === 401){
        return Promise.reject(new Error("未登录或登录失效"));
    }

    if (data.code !== 200) {
        return Promise.reject(new Error(data.message || 'Error'))
    }

    // 去掉包裹层,直接返回数据
    return data.data
}, errorHandler)

export default request
