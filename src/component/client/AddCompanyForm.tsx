import React, { useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import type { Company } from '@/model'

interface AddCompanyProps {
  open: boolean
  onSubmit: (props: Omit<Company, 'company_id'>) => void
  onCancel: () => void
}

const AddCompanyForm: React.FC<AddCompanyProps> = props => {
  /** 公司名称 */
  const name = useRef<InputRef>(null)

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      company_name: name.current?.input?.value ?? '',
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="添加企业信息" closable okText="确认" cancelText="取消" okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="企业名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入企业名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddCompanyForm
