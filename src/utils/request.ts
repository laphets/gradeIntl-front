import axios, { AxiosError } from 'axios'
import db from '@/utils/db';
import store from '@/store';
import { errorMessage } from '@/utils/message';

const instance = axios.create({
    baseURL: `/api`,
    timeout: 5000
})

instance.interceptors.request.use(config => {
    config.headers['Authorization'] = db.token.get()
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    const data = response.data
    if (data.code !== 0) {
        errorMessage(data.message)
        if (data.code === 20004) {
            // token invalid
            store.dispatch('Logout')
        }
        return Promise.reject(response)
    }
    return response
}, (error: AxiosError) => {
    errorMessage(error.code)
    return Promise.reject(error)
})

export default instance
