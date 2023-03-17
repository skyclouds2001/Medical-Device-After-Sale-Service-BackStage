import React, { useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import type { InputRef } from 'antd'
import type { ProductType } from '@/model'

interface AddProductTypeProps {
  open: boolean
  onSubmit: (props: Omit<ProductType, 'type_id'>) => void
  onCancel: () => void
}

const AddProductTypeForm: React.FC<AddProductTypeProps> = props => {
  /** 产品大类名称 */
  const name = useRef<InputRef>(null)

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      type_name: name.current?.input?.value ?? '',
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="添加产品大类" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品大类名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品大类名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddProductTypeForm
