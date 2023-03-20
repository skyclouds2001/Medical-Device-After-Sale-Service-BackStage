import React, { useRef, useState } from 'react'
import { App, Form, Input, Modal, Upload, Image } from 'antd'
import type { InputRef, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api'
import ProductTypeSelector from '@/component/product/ProductTypeSelector'
import CustomerServiceSelector from '@/component/customer-service/CustomerServiceSelector'
import type { ProductModel } from '@/model'

interface AddProductModelProps {
  open: boolean
  onSubmit: (props: Omit<ProductModel, 'model_id' | 'type_name'> & { services: string[]; avatar: string }) => void
  onCancel: () => void
}

const AddProductModelForm: React.FC<AddProductModelProps> = props => {
  const { message } = App.useApp()

  /** 产品类型名称 */
  const name = useRef<InputRef>(null)
  /** 产品类型所属大类 */
  const type = useRef<number>(-1)
  /** 产品类型对应客服 */
  const services = useRef<string[]>([])
  /** 产品类型对应客服头像 */
  const [avatar, setAvatar] = useState<string>('')
  /** 产品图片 */
  const [image, setImage] = useState<string>('')

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      model_name: name.current?.input?.value ?? '',
      type_id: type.current,
      services: services.current,
      avatar,
      pic_url: image,
    })
    setTimeout(() => {
      setImage('')
      setAvatar('')
    }, 3000)
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
    setTimeout(() => {
      setImage('')
      setAvatar('')
    }, 3000)
  }

  /**
   * 自定义上传图片方法
   *
   * @param e 上传图片事件
   * @param type 类型-头像/图片
   */
  const uploadImage = (e: Parameters<Required<UploadProps>['customRequest']>[0], type: 'avatar' | 'image'): void => {
    uploadFile(e.file as File)
      .then(res => {
        if (res.code === 0) {
          switch (type) {
            case 'avatar':
              setAvatar(res.data)
              break
            case 'image':
              setImage(res.data)
              break
          }
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
    <Modal open={props.open} title="添加产品型号" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" />
        </Form.Item>
        <Form.Item label="产品所属大类" name="type">
          <ProductTypeSelector onSelect={v => (type.current = v)} />
        </Form.Item>
        <Form.Item label="产品所属客服" name="service">
          <CustomerServiceSelector onSelect={v => (services.current = v)} />
        </Form.Item>
        <Form.Item label="客服头像" name="image">
          <Upload accept="image/*" listType="picture-card" maxCount={1} showUploadList={false} customRequest={e => uploadImage(e, 'avatar')} fileList={[]}>
            {avatar !== '' ? (
              <Image src={avatar} alt="" />
            ) : (
              <div>
                <PlusOutlined />
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="产品图片" name="image">
          <Upload accept="image/*" listType="picture-card" maxCount={1} showUploadList={false} customRequest={e => uploadImage(e, 'image')} fileList={[]}>
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
