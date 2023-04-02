import React, { useState, useRef } from 'react'
import { App, Form, Image, Modal, Upload, type UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api'
import CustomerServiceSelector from '@/component/customer-service/CustomerServiceSelector'
import type { Service } from '@/model'

interface ManageCustomerServiceProps {
  open: boolean
  current?: {
    services?: Service[]
    avatar: string
  }
  onSubmit: (ids: Array<string | number>, avatar: string) => void
  onCancel: () => void
}

const ManageCustomerService: React.FC<ManageCustomerServiceProps> = props => {
  const { message } = App.useApp()

  /** 客服列表 */
  const groups = useRef<Array<string | number>>([])
  /** 产品图片 */
  const [image, setImage] = useState('')

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit(groups.current.length > 0 ? groups.current : props.current?.services?.map(v => v.user_id) ?? [], image !== '' ? image : props.current?.avatar ?? '')
    setTimeout(() => {
      setImage('')
    }, 3000)
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
    setTimeout(() => {
      setImage('')
    }, 3000)
  }

  /**
   * 自定义上传图片方法
   *
   * @param e 选择图片事件
   */
  const uploadImage: UploadProps['customRequest'] = e => {
    uploadFile(e.file as File)
      .then(res => {
        if (res.code === 0) {
          setImage(res.data)
        } else {
          void message.error({
            content: res.data.toString() ?? '上传图片失败',
          })
        }
      })
      .catch(() => {
        void message.error({
          content: '上传图片失败',
        })
      })
  }

  return (
    <Modal open={props.open} title="管理产品客服" okText="确认" cancelText="取消" okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose closable onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="客服" name="customer_service">
          <CustomerServiceSelector onSelect={ids => (groups.current = ids)} />
        </Form.Item>
        <Form.Item label="客服头像" name="image">
          <Upload accept="image/*" listType="picture-card" maxCount={1} showUploadList={false} customRequest={uploadImage} fileList={[]}>
            {image !== '' ? (
              <Image src={image} alt="" preview={false} />
            ) : (
              <div>
                <PlusOutlined />
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ManageCustomerService
