import React, { useRef } from 'react'
import { Form, Modal } from 'antd'
import CustomerServiceSelector from '@/component/CustomerServiceSelector'
import type { ProductModel } from '@/model'

interface EditCustomerServiceProps {
  open: boolean
  onSubmit: (props: ProductModel) => void
  onCancel: () => void
  properties: ProductModel
}

const EditCustomerService: React.FC<EditCustomerServiceProps> = props => {
  const groups = useRef<number[]>([])

  const submit = (): void => {
    props.onSubmit({
      ...props.properties,
      /* eslint-disable-next-line */
      // @ts-ignore
      services: [...groups.current],
    })
  }

  const cancel = (): void => {
    props.onCancel()
  }

  const select = (ids: number[]): void => {
    groups.current = ids
  }

  return (
    <Modal open={props.open} title="修改产品客服" closable={true} onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="客服" name="customer_service">
          <CustomerServiceSelector onSelect={select} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditCustomerService
