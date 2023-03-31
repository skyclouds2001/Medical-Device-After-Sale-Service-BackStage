import React, { useRef, useState } from 'react'
import { App, Form, Input, Modal, Upload, Image } from 'antd'
import type { InputRef, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api'
import type { ProductModel } from '@/model'

interface AddProductModelProps {
  open: boolean
  onSubmit: (props: Omit<ProductModel, 'model_id'>) => void
  onCancel: () => void
}

const AddProductModelForm: React.FC<AddProductModelProps> = props => {
  const { message } = App.useApp()

  /** 产品类型名称 */
  const name = useRef<InputRef>(null)
  /** 产品图标 */
  const [image, setImage] = useState<string>('')

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      model_name: name.current?.input?.value ?? '',
      pic_url: image,
    })
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
   * @param e 上传图片事件
   */
  const uploadImage = (e: Parameters<Required<UploadProps>['customRequest']>[0]): void => {
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
    <Modal open={props.open} title="添加产品" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" />
        </Form.Item>
        <Form.Item label="产品图标" name="image">
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

export default AddProductModelForm
