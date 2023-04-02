import React, { useState, useEffect } from 'react'
import { Form, Input, Modal } from 'antd'
import CompanySelector from '@/component/client/CompanySelector'
import type { Customer } from '@/model'

interface EditCustomerProps {
  open: boolean
  onSubmit: (props: Omit<Customer, 'company_name' | 'mobile'> & { customer_password: string }) => void
  onCancel: () => void
  properties?: Customer
}

const EditCustomerForm: React.FC<EditCustomerProps> = props => {
  /** 客户账号姓名 */
  const [name, setName] = useState('')
  /** 客户账号密码 */
  const [pwd, setPwd] = useState('')
  /** 客服所属公司 */
  const [company, setCompany] = useState(-2)

  useEffect(() => {
    setName(props.properties?.customer_name ?? '')
    setCompany(props.properties?.company_id ?? -1)
  }, [props.properties])

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      customer_id: props.properties?.customer_id ?? -1,
      customer_name: name !== '' ? name : props.properties?.customer_name ?? '',
      customer_password: pwd,
      company_id: company !== -1 ? company : props.properties?.company_id ?? -1,
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="修改客户信息" closable okText="确认" cancelText="取消" okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="用户名" name="name">
          <Input value={name} className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户账号名称" onChange={e => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="密码" name="mobile">
          <Input value={pwd} className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户账号密码" onChange={e => setPwd(e.target.value)} />
        </Form.Item>
        <Form.Item label="所属公司" name="company">
          <CompanySelector onSelect={com => setCompany(com)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditCustomerForm
