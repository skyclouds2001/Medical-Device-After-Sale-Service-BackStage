import React, { useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import type { InputRef } from 'antd'
import type { ProductType } from '@/model'

interface EditProductTypeProps {
  open: boolean
  onSubmit: (props: ProductType) => void
  onCancel: () => void
  properties: ProductType
}

const EditProductType: React.FC<EditProductTypeProps> = props => {
  /** 产品大类名称 */
  const name = useRef<InputRef>(null)

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      type_name: name.current?.input?.value ?? props.properties.type_name,
      type_id: props.properties.type_id,
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="修改产品大类信息" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品大类名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品大类名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProductType
