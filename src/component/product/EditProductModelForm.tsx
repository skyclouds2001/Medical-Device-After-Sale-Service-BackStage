import React, { useState, useEffect } from 'react'
import { App, Form, Image, Input, Modal, Upload, type UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api'
import type { ProductModel } from '@/model'

interface EditProductModelProps {
  open: boolean
  onSubmit: (props: ProductModel) => void
  onCancel: () => void
  properties: ProductModel
}

const EditProductModelForm: React.FC<EditProductModelProps> = props => {
  const { message } = App.useApp()

  /** 产品类型名称 */
  const [name, setName] = useState('')
  /** 产品图标 */
  const [image, setImage] = useState<string>('')

  useEffect(() => {
    if (props.properties !== undefined) {
      setName(props.properties.model_name)
      setImage(props.properties.pic_url)
    }
  }, [props.properties])

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      model_id: props.properties.model_id,
      model_name: name !== '' ? name : props.properties.model_name,
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
    <Modal open={props.open} title="修改产品" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false} preserve={false}>
        <Form.Item label="产品名称" name="name">
          <Input name="name" value={name} className="rounded-xl" autoComplete="off" placeholder="请输入产品名称" onChange={e => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="产品图标">
          <Form.Item name="image" className="m-0">
            <Upload name="image" accept="image/*" listType="picture-card" maxCount={1} showUploadList={false} customRequest={uploadImage} fileList={[]}>
              {image !== '' ? (
                <Image src={image} alt="" preview={false} />
              ) : (
                <div>
                  <PlusOutlined />
                </div>
              )}
            </Upload>
          </Form.Item>
          <p className="text-gray-500 text-xs">点击修改图标</p>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProductModelForm
