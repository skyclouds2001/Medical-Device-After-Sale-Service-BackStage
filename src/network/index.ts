/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable promise/no-promise-in-callback */

import axios from 'axios'
import type { AxiosHeaders } from 'axios'
import { BASE_URL, NETWORK_TIMEOUT, WHITE_LIST } from '@/config'
import { getStorage } from '@/util'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
})

instance.interceptors.request.use(
  config => {
    if (!WHITE_LIST.includes(config.url ?? '')) {
      config.headers = {
        ...config.headers,
        Authorization: getStorage<string>('token') ?? '',
      } as unknown as AxiosHeaders
    }
    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  result => result,
  error => Promise.reject(error),
)

export default instance
