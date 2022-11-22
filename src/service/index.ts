import axios from 'axios'
import { BASE_URL, NETWORK_TIMEOUT } from '@/config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT
})

instance.interceptors.request.use(
  config => config,
  async error => await Promise.reject(error)
)

instance.interceptors.response.use(
  result => result,
  async error => await Promise.reject(error)
)

export default instance
