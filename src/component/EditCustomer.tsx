import React, { useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import CompanySelector from '@/component/CompanySelector'
import type { Customer } from '@/model'

interface EditCustomerProps {
  open: boolean
  onSubmit: (props: Omit<Customer, 'company_name'>) => void
  onCancel: () => void
  properties: Customer
}

const EditCustomer: React.FC<EditCustomerProps> = props => {
  const name = useRef<InputRef>(null)
  const mobile = useRef<InputRef>(null)
  const company = useRef<number>(-1)

  const submit = (): void => {
    props.onSubmit({
      customer_id: props.properties.customer_id,
      customer_name: name.current?.input?.value ?? '',
      mobile: mobile.current?.input?.value ?? '',
      company_id: company.current,
    })
  }

  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="修改客户信息" closable onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="客户名称" name="name">
          <Input ref={name} className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户名称" />
        </Form.Item>
        <Form.Item label="客户联系方式" name="mobile">
          <Input ref={mobile} className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户联系方式" />
        </Form.Item>
        <Form.Item label="客户所属公司" name="company">
          <CompanySelector onSelect={com => (company.current = com)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditCustomer
