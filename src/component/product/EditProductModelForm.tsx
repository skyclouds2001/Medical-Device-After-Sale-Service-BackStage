import React, { useRef, useState } from 'react'
import { App, Form, Image, Input, Modal, Upload, type UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api'
import ProductTypeSelector from '@/component/product/ProductTypeSelector'
import type { ProductModel } from '@/model'

interface EditProductModelProps {
  open: boolean
  onSubmit: (props: Omit<ProductModel, 'type_name'>) => void
  onCancel: () => void
  properties: Omit<ProductModel, 'type_name'>
}

const EditProductModelForm: React.FC<EditProductModelProps> = props => {
  const { message } = App.useApp()

  /** 产品类型名称 */
  const [name, setName] = useState('')
  /** 产品类型所属大类 */
  const type = useRef(0)
  /** 产品图片 */
  const [image, setImage] = useState<string>('')

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      model_id: props.properties.model_id,
      model_name: name !== '' ? name : props.properties.model_name,
      type_id: type.current !== 0 ? type.current : props.properties.type_id,
      pic_url: image !== '' ? image : props.properties.pic_url,
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  /**
   * 自定义上传图片方法
   *
   * @param e 选择图片事件
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
    <Modal open={props.open} title="修改产品型号" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品名称" name="name">
          <Input value={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" onChange={e => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="产品所属大类" name="type">
          <ProductTypeSelector onSelect={v => (type.current = v)} />
        </Form.Item>
        <Form.Item label="产品图片" name="image">
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

export default EditProductModelForm
