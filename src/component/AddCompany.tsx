import React, { useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import type { Company } from '@/model'

interface AddCompanyProps {
  open: boolean
  onSubmit: (props: Omit<Company, 'company_id'>) => void
  onCancel: () => void
}

const AddCompany: React.FC<AddCompanyProps> = props => {
  const name = useRef<InputRef>(null)

  const submit = (): void => {
    props.onSubmit({
      company_name: name.current?.input?.value ?? '',
    })
  }

  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="添加企业信息" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="企业名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入企业名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddCompany
