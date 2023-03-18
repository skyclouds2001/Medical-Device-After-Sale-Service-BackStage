import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import type { ProductType } from '@/model'

interface EditProductTypeProps {
  open: boolean
  onSubmit: (props: ProductType) => void
  onCancel: () => void
  properties: ProductType
}

const EditProductTypeForm: React.FC<EditProductTypeProps> = props => {
  /** 产品大类名称 */
  const [name, setName] = useState('')

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      type_name: name !== '' ? name : props.properties.type_name,
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
    <Modal open={props.open} title="修改产品大类信息" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品大类名称" name="name">
          <Input value={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品大类名称" onChange={e => setName(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProductTypeForm
