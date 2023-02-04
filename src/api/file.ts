import instance from '@/network'
import type { Response } from '@/model'

/**
 * 上传文件方法
 *
 * @param file 文件
 */
export const uploadFile = async (file: File): Promise<Response<string>> => {
  const res = await instance.post<Response<string>>(
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
  return res.data
}
