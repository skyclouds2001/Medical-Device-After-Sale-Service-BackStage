import React, { useState } from 'react'
import { Form, Input } from 'antd'
import Customer from '@/model/customer'

export default function EditCustomer(props: { customer: Customer; onUpdate: (customer: Customer) => Promise<void> }): JSX.Element {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState(0)

  return (
    <Form labelCol={{ span: 6 }}>
      <Form.Item label="name" name="name">
        <Input className="rounded-xl mx-2" placeholder="请输入客户名称" value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="mobile" name="mobile">
        <Input className="rounded-xl mx-2" placeholder="请输入客户联系方式" value={mobile} onChange={e => setMobile(e.target.value)} />
      </Form.Item>
      <Form.Item label="company" name="company">
        <Input className="rounded-xl mx-2" placeholder="请输入客户所属公司" value={company} onChange={e => setCompany(parseInt(e.target.value))} />
      </Form.Item>
    </Form>
  )
}
