import React, { useRef } from 'react'
import { Form, Modal } from 'antd'
import CustomerServiceSelector from '@/component/CustomerServiceSelector'

interface EditCustomerServiceProps {
  open: boolean
  onSubmit: (ids: string[]) => void
  onCancel: () => void
}

const ManageCustomerService: React.FC<EditCustomerServiceProps> = props => {
  const groups = useRef<string[]>([])

  const submit = (): void => {
    props.onSubmit(groups.current)
  }

  const cancel = (): void => {
    props.onCancel()
  }

  const select = (ids: string[]): void => {
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

export default ManageCustomerService
