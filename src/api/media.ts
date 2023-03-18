import instance from '@/network'
import type { Response } from '@/model'

/**
 * 上传文件方法
 *
 * @param file - 文件
 * @returns - 上传的文件URL
 */
export const uploadFile = (file: File): Promise<Response<string>> =>
  instance.post(
    '/wizz/aftersale/media/upload',
    {
      file,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
