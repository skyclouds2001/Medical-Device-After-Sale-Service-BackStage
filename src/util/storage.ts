/* eslint-disable */
import { lowerCase } from 'lodash-es'
import { APPLICATION_NAME, APPLICATION_VERSION } from '@/config'
import { encrypt, decrypt } from '@/util'

/** 存储键名前缀 */
const prefix = lowerCase(APPLICATION_NAME.replace(/[a-z]/g, '')) + '_' + APPLICATION_VERSION
/** 默认存储类型 */
const storage = window.localStorage

/**
 * 存储数据的数据格式
 */
interface Data <T = any> {
  /** 数据内容 */
  value: any
  /** 存储时间戳 */
  time: number
  /** 超时时间长度 */
  expire: number
}

/**
 * 获取存储方法
 *
 * @param {string} key 键名
 */
export const getStorage = <T = unknown>(key: string): T | null => {
  const s_key = prefix + '_' + key

  if (storage.getItem(s_key) == null) {
    return null
  }

  const data: Data<T> = JSON.parse(decrypt(storage.getItem(s_key) as string))

  if (data.expire + data.time > Date.now()) {
    return data.value
  } else {
    removeStorage(key)
    return null
  }
}

/**
 * 设置存储方法
 *
 * @param {string} key 键名
 * @param {any} value 键值
 * @param {number} expire 超时时间
 */
export const setStorage = <T = unknown>(key: string, value: T | null, expire = 0): void => {
  const s_key = prefix + '_' + key
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
      expire,
    }),
  )

  storage.setItem(s_key, data)
}

/**
 * 移除存储方法
 *
 * @param {string} key 键名
 */
export const removeStorage = (key: string): void => {
  const s_key = prefix + '_' + key
  storage.removeItem(s_key)
}

/**
 * 清空存储方法
 */
export const clearStorage = (): void => {
  storage.clear()
}

/**
 * 返回当前存储长度
 */
export const length = (): number => storage.length
