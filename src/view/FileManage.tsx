/* eslint-disable @typescript-eslint/promise-function-async */

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Menu, Row, Col, type MenuProps } from 'antd'
import useSwr from 'swr'
import { addFile, getFileList } from '@/api'
import FileTable from '@/component/file/FileTable'
import UploadFileForm from '@/component/file/UploadFileForm'
import { services } from '@/data'
import type { CustomAction } from '@/store'

const FileManage: React.FC = () => {
  const dispatch = useDispatch()

  const items: MenuProps['items'] = services.slice(-2).map(v => ({ label: v.text, key: String(v.id - 4) }))

  const [type, setType] = useState<'0' | '1'>('0')

  const [open, setOpen] = useState(false)

  const { data, isLoading, mutate } = useSwr(['/wizz/aftersale/file/list', type], ([, type]) => getFileList(Number(type) as 0 | 1))

  /**
   * 选取服务类型方法
   *
   * @param key.key
   * @param key 服务ID
   */
  const handleSelectService: MenuProps['onClick'] = ({ key }) => {
    setType(key as '0' | '1')
  }

  /**
   * 打开上传文件表单方法
   */
  const openUploadFileForm = (): void => {
    setOpen(true)
  }

  /**
   * 关闭上传文件表单方法
   */
  const closeUploadFileForm = (): void => {
    setOpen(false)
  }

  const handleSubmitFiles = (files: Array<{ name: string; url: string }>): void => {
    void Promise.allSettled(files.map(v => addFile(v.name, parseInt(type) as 0 | 1, v.url))).finally(() => {
      setOpen(false)
      void mutate()
    })
  }

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '文件管理' })
  }, [])

  return (
    <>
      <div className="w-full px-2 py-5 text-right">
        <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={openUploadFileForm}>
          上传文件
        </Button>
      </div>
      <Row className="w-full" gutter={16}>
        <Col span={8}>
          <Menu className="border" items={items} defaultSelectedKeys={['0']} onClick={handleSelectService} />
        </Col>
        <Col span={16}>
          <FileTable service={type.toString() as '0' | '1'} files={data?.data.file_info_list ?? []} loading={isLoading} mutate={mutate} />
        </Col>
      </Row>

      <UploadFileForm open={open} onSubmit={handleSubmitFiles} onCancel={closeUploadFileForm} />
    </>
  )
}

export default FileManage
