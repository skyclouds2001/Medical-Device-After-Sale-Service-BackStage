import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { getAllCompanyInfo } from '@/apis'
import type { Company } from '@/model'

interface AddCustomerProps {
  crf: ReturnType<typeof useRef>
}

export default forwardRef(function AddCustomer(props: AddCustomerProps, _ref): JSX.Element {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState(0)
  const [companies, setCompanies] = useState<Company[]>([])

  useImperativeHandle(props.crf, () => ({
    getCustomer: () => ({
      name,
      company,
      mobile
    })
  }))

  useEffect(() => {
    getAllCompanyInfo()
      .then(res => {
        setCompanies(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <Form labelCol={{ span: 8 }} colon={false}>
      <Form.Item label="客户名称" name="name">
        <Input className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户名称" value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="客户联系方式" name="mobile">
        <Input className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户联系方式" value={mobile} onChange={e => setMobile(e.target.value)} />
      </Form.Item>
      <Form.Item label="客户所属公司" name="company">
        <Select className="rounded-sm mx-2" placeholder="请选择客户所属公司" onChange={(value: number) => setCompany(value)}>
          {companies.map(v => (
            <Select.Option key={v.company_id} value={v.company_id}>
              {v.company_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})
