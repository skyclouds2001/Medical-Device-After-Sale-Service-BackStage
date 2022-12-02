import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import type Customer from '@/model/customer'
import { getCompanyInfo } from '@/apis'
import type Company from '@/model/company'

interface EditCustomerProps {
  customer: Customer
  crf: ReturnType<typeof useRef>
}

export default forwardRef(function EditCustomer(props: EditCustomerProps, _ref): JSX.Element {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState(0)
  const [companies, setCompanies] = useState<Company[]>([])

  useImperativeHandle(props.crf, () => ({
    getCustomer: () => ({
      name,
      mobile,
      company
    })
  }))

  useEffect(() => {
    const loadCompany = async (): Promise<void> => {
      const res = await getCompanyInfo(true, 1)
      setCompanies([...res.data.company_list])
      const num = res.data.total_page_num
      const pros = []
      for (let i = 2; i <= num; ++i) {
        pros.push(getCompanyInfo(false, i))
      }
      const result = await Promise.allSettled(pros)
      result.forEach(v => {
        if (v.status !== 'rejected') {
          setCompanies([...companies, ...v.value.data.company_list])
        }
      })
    }

    void loadCompany()
  }, [])

  return (
    <Form labelCol={{ span: 8 }} colon={false}>
      <Form.Item label="客户名称" name="name">
        <Input className="rounded-xl mx-2" placeholder="请输入客户名称" value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="客户联系方式" name="mobile">
        <Input className="rounded-xl mx-2" placeholder="请输入客户联系方式" value={mobile} onChange={e => setMobile(e.target.value)} />
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
