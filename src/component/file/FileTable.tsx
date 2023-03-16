import React from 'react'
import { Table, Image, Tag, Button, App } from 'antd'
import { KeyedMutator } from 'swr'
import { getFileList, deleteFile } from '@/api'
import type { File } from '@/model'
import { getFileType, getFileIcon, downloadFile } from '@/util'

interface FileTableProps {
  service: '0' | '1'
  files: File[]
  loading: boolean
  mutate: KeyedMutator<Awaited<ReturnType<typeof getFileList>>>
}

const FileTable: React.FC<FileTableProps> = props => {
  const { message } = App.useApp()

  /**
   * 删除文件方法
   *
   * @param id 文件ID
   */
  const removeFile = (id: number): void => {
    deleteFile(id.toString())
      .then(res => {
        if (res.code === 0) {
          void message.success({
            content: '删除成功',
          })
          void props.mutate()
        } else {
          void message.error({
            content: res.data ?? '删除失败',
          })
        }
      })
      .catch(() => {
        void message.error({
          content: '删除失败',
        })
      })
  }

  return (
    <>
      <Table dataSource={props.files ?? []} bordered rowKey="file_id" loading={props.loading} pagination={false}>
        <Table.Column width="200px" align="center" title="文件名称" dataIndex="file_name" key="file_name" />
        <Table.Column
          width="200px"
          align="center"
          title="文件类型"
          key="file_type"
          render={(_, record: File) => (
            <>
              <div className="flex justify-center items-center">
                <Tag>{getFileType(record.file_url)}</Tag>
                <Image src={getFileIcon(record.file_url)} width={20} alt={record.file_name} preview={false} placeholder={true} />
              </div>
            </>
          )}
        />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: File) => (
            <>
              <Button type="link" onClick={() => downloadFile(record.file_url, record.file_name)}>
                下载
              </Button>
              <Button type="link" danger onClick={() => removeFile(record.id)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default FileTable
