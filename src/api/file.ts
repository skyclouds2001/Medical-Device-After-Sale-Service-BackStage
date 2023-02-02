import instance from '@/network'
import type { Response } from '@/model'

/**
 * 上传文件方法
 *
 * @param file 文件
 */
export const uploadFile = async (file: File): Promise<unknown> => {
  const res = await instance.post<Response>(
    '/media/upload',
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
