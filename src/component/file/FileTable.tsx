import React from 'react'
import { Table, Image, Tag, Button } from 'antd'
import type { File } from '@/model'
import { getFileType, getFileIcon, downloadFile } from '@/util'

interface FileTableProps {
  files: File[]
  loading: boolean
  onDelete: (id: number) => void
}

const FileTable: React.FC<FileTableProps> = props => {
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
              <Button type="link" danger onClick={() => props.onDelete(record.id)}>
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
