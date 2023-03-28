import React, { useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import CompanySelector from '@/component/client/CompanySelector'
import type { Customer } from '@/model'

interface AddCustomerProps {
  open: boolean
  onSubmit: (props: Omit<Customer, 'customer_id' | 'company_name' | 'mobile'> & { customer_password: string }) => void
  onCancel: () => void
}

const AddCustomerForm: React.FC<AddCustomerProps> = props => {
  /** 客户账号名称 */
  const name = useRef<InputRef>(null)
  /** 客户账号密码 */
  const pwd = useRef<InputRef>(null)
  /** 客服所属公司 */
  const company = useRef(-1)

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      customer_name: name.current?.input?.value ?? '',
      customer_password: pwd.current?.input?.value ?? '',
      company_id: company.current,
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="添加客户信息" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="用户名" name="name">
          <Input ref={name} className="rounded-sm mx-2" autoComplete="off" placeholder="请输入账号名称" />
        </Form.Item>
        <Form.Item label="密码" name="mobile">
          <Input ref={pwd} className="rounded-sm mx-2" autoComplete="off" placeholder="请输入客户账号密码" />
        </Form.Item>
        <Form.Item label="所属公司" name="company">
          <CompanySelector onSelect={com => (company.current = com)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddCustomerForm
