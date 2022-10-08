import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost',
  timeout: 10000
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
