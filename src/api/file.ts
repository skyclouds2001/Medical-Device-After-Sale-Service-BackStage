import qs from 'qs'
import instance from '@/network'
import type { Response, File } from '@/model'

/**
 * 获取文件列表返回接口数据结构
 */
interface GetFileListResponse {
  /** 文件列表 */
  file_info_list: File[]
}

/**
 * 获取文件列表方法
 *
 * @param type - 服务类型 0培训 | 1升级
 * @returns - 文件列表数据
 */
export const getFileList = (type: 0 | 1): Promise<Response<GetFileListResponse>> =>
  instance.get('/wizz/aftersale/file/list', {
    params: {
      fileType: type,
    },
  })

/**
 * 添加文件方法
 *
 * @param name - 文件名
 * @param type - 文件类型
 * @param url - 文件URL
 * @returns - null
 */
export const addFile = (name: string, type: 0 | 1, url: string): Promise<Response<null>> =>
  instance.post(
    '/wizz/aftersale/file/add',
    {
      file_name: name,
      file_type: type,
      file_url: url,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

/**
 * 移除文件方法
 *
 * @param id - 文件ID
 * @returns - null
 */
export const deleteFile = (id: string): Promise<Response<null>> =>
  instance.delete('/wizz/aftersale/file/delete', {
    data: qs.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
