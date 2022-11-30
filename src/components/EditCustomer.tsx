import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { Form, Input } from 'antd'
import type Customer from '@/model/customer'

interface EditCustomerProps {
  customer: Customer
  crf: ReturnType<typeof useRef>
}

export default forwardRef(function EditCustomer(props: EditCustomerProps, _ref): JSX.Element {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState(0)

  useImperativeHandle(props.crf, () => ({
    getCustomer: () => ({
      name,
      mobile,
      company
    })
  }))

  return (
    <Form labelCol={{ span: 8 }} colon={false}>
      <Form.Item label="客户名称" name="name">
        <Input className="rounded-xl mx-2" placeholder="请输入客户名称" value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="客户联系方式" name="mobile">
        <Input className="rounded-xl mx-2" placeholder="请输入客户联系方式" value={mobile} onChange={e => setMobile(e.target.value)} />
      </Form.Item>
      <Form.Item label="客户所属公司" name="company">
        <Input className="rounded-xl mx-2" placeholder="请输入客户所属公司" value={company} onChange={e => setCompany(parseInt(e.target.value))} />
      </Form.Item>
    </Form>
  )
})
