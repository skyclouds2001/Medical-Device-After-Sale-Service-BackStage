import axios from 'axios'
import type { AxiosHeaders } from 'axios'
import { BASE_URL, NETWORK_TIMEOUT } from '@/config'
import Storage from '@/utils/storage'

const WHITE_LIST = ['/wizz/aftersale/account/admin/login', '/wizz/aftersale/account/admin/resetPassword']

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    if (!WHITE_LIST.includes(config.url ?? '')) {
      config.headers = {
        ...config.headers,
        Authorization: Storage.getItem<string>('token') ?? ''
      } as unknown as AxiosHeaders
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
