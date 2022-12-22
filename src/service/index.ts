import axios from 'axios'
import { BASE_URL, NETWORK_TIMEOUT } from '@/config'
import Storage from '@/utils/storage'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    const token = Storage.getItem<string>('token')
    if (token != null && config.url != null && !['/wizz/aftersale/account/admin/login', '/wizz/aftersale/account/admin/resetPassword'].includes(config.url)) {
      config.headers = {
        ...config.headers,
        Authorization: token
      }
    }
    return config
  },
  async error => await Promise.reject(error)
)

instance.interceptors.response.use(
  result => result,
  async error => await Promise.reject(error)
)

export default instance
