import React, { useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import ProductTypeSelector from '@/component/ProductTypeSelector'
import type { ProductModel } from '@/model'

interface EditProductModelProps {
  open: boolean
  onSubmit: (props: Omit<ProductModel, 'type_name' | 'services'>) => void
  onCancel: () => void
  properties: ProductModel
}

const EditProductModel: React.FC<EditProductModelProps> = props => {
  /** 产品类型名称 */
  const name = useRef<InputRef>(null)
  /** 产品类型所属大类 */
  const type = useRef<number>(-1)

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      model_id: props.properties.model_id,
      model_name: name.current?.input?.value ?? props.properties.model_name,
      type_id: type.current !== -1 ? type.current : props.properties.type_id,
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="修改产品型号" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="产品名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" />
        </Form.Item>
        <Form.Item label="产品所属大类" name="type">
          <ProductTypeSelector onSelect={v => (type.current = v)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProductModel
