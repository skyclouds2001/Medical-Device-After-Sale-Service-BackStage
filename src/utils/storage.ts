import { lowerCase } from 'lodash'
import { APPLICATION_NAME, APPLICATION_VERSION } from '@/config'

const prefix = lowerCase(APPLICATION_NAME.replace(/[a-z]/g, '')) + '_' + APPLICATION_VERSION
const storage = window.localStorage

interface Data {
  value: any
  time: number
  expire: number
}

const encrypt = (data: string): string => {
  return data
}

const decrypt = (data: string): string => {
  return data
}

export const getStorage = (key: string): any => {
  key = prefix + '_' + key

  if (storage.getItem(key) == null) {
    return null
  }

  const data: Data = JSON.parse(decrypt(storage.getItem(key) as string))

  return data.expire + data.time <= Date.now() ? data.value : null
}

export const setStorage = (key: string, value: any, expire = 0): void => {
  key = prefix + '_' + key
  if (value === null || value === undefined) {
    value = null
  }
  if (Number.isNaN(expire) || expire < 0) {
    expire = 0
  }

  const data = encrypt(
    JSON.stringify({
      value,
      time: Date.now(),
      expire
    })
  )

  storage.setItem(key, data)
}

const Storage = {
  getStorage,
  setStorage
}

export default Storage
