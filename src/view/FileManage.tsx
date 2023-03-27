import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { App, Button, Menu, Row, Col, type MenuProps } from 'antd'
import useSwr from 'swr'
import { addFile, deleteFile, getFileList } from '@/api'
import FileTable from '@/component/file/FileTable'
import UploadFileForm from '@/component/file/UploadFileForm'
import { services } from '@/data'
import type { CustomAction } from '@/store'

const FileManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  const items: MenuProps['items'] = services.slice(-2).map(v => ({ label: v.text, key: String(v.id - 4) }))

  const [type, setType] = useState<'0' | '1'>('0')

  const [open, setOpen] = useState(false)

  const { data, isLoading, mutate } = useSwr(['/wizz/aftersale/file/list', type], ([, type]) => getFileList(Number(type) as 0 | 1))

  /**
   * 确认上传文件回调方法
   *
   * @param files 文件列表
   */
  const handleSubmitFiles = (files: Array<{ name: string; url: string }>): void => {
    void Promise.allSettled(files.map(v => addFile(v.name, parseInt(type) as 0 | 1, v.url))).finally(() => {
      setOpen(false)
      void mutate()
    })
  }

  /**
   * 删除文件方法
   *
   * @param id 文件ID
   */
  const removeFile = (id: number): void => {
    void deleteFile(id.toString())
      .then(res => {
        if (res.code === 0) {
          void message.success({
            content: '删除成功',
          })
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
      .finally(() => {
        void mutate()
      })
  }

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '文件管理' })
  }, [])

  return (
    <>
      <Row className="w-full" gutter={40}>
        <Col span={24}>
          <div className="w-full py-5 text-right">
            <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={() => setOpen(true)}>
              上传文件
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="w-full" gutter={40}>
        <Col span={6}>
          <Menu className="border" items={items} defaultSelectedKeys={['0']} onClick={({ key }) => setType(key as '0' | '1')} />
        </Col>
        <Col span={18}>
          <FileTable files={Array.isArray(data?.data.file_info_list) ? data?.data.file_info_list ?? [] : []} loading={isLoading} onDelete={removeFile} />
        </Col>
      </Row>

      <UploadFileForm open={open} onSubmit={handleSubmitFiles} onCancel={() => setOpen(false)} />
    </>
  )
}

export default FileManage
