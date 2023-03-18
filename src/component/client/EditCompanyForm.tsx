import React, { useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import type { InputRef } from 'antd'
import type { Company } from '@/model'

interface EditCompanyProps {
  open: boolean
  onSubmit: (props: Company) => void
  onCancel: () => void
  properties: Company
}

const EditCompanyForm: React.FC<EditCompanyProps> = props => {
  /** 公司名称 */
  const name = useRef<InputRef>(null)

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit({
      company_name: name.current?.input?.value ?? props.properties.company_name,
      company_id: props.properties.company_id,
    })
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  return (
    <Modal open={props.open} title="修改企业信息" closable okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} destroyOnClose onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="企业名称" name="name">
          <Input ref={name} className="rounded-xl mx-2" autoComplete="off" placeholder="请输入企业名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditCompanyForm
