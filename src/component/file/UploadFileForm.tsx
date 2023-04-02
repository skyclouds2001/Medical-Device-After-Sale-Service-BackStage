import React, { useState } from 'react'
import { Modal, Upload, App, type UploadProps, type UploadFile } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api'

interface UploadFileFormProps {
  open: boolean
  onSubmit?: (props: Array<{ name: string; url: string }>) => void
  onCancel?: () => void
}

const UploadFileForm: React.FC<UploadFileFormProps> = props => {
  const { message } = App.useApp()

  const [files, setFiles] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    setUploading(true)
    if (file.status === 'removed') {
      setFiles(files.filter(v => v.uid !== file.uid))
    } else {
      void uploadFile(file as unknown as File)
        .then(
          res => {
            if (res.code === 0) {
              const url = res.data
              setFiles([
                ...files,
                {
                  name: file.name,
                  url,
                  uid: url,
                },
              ])
            } else {
              void message.error({
                content: res.data ?? '上传失败',
              })
            }
          },
          () => {
            void message.error({
              content: '上传失败',
            })
          },
        )
        .finally(() => {
          setUploading(false)
        })
    }
  }

  /**
   * 提交表单
   */
  const submit = (): void => {
    if (uploading) return
    props.onSubmit?.(files.map(v => ({ name: v.name, url: v.uid })))
    setFiles([])
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel?.()
    setFiles([])
  }

  return (
    <>
      <Modal open={props.open} title="上传文件" closable okText="确认" cancelText="取消" okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
        <Upload name="file" listType="picture-card" fileList={files} onChange={handleChange} beforeUpload={() => false}>
          <div>
            {uploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Modal>
    </>
  )
}

export default UploadFileForm
