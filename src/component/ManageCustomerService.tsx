import React, { useRef } from 'react'
import { Form, Modal } from 'antd'
import CustomerServiceSelector from '@/component/CustomerServiceSelector'

interface ManageCustomerServiceProps {
  open: boolean
  onSubmit: (ids: string[]) => void
  onCancel: () => void
}

const ManageCustomerService: React.FC<ManageCustomerServiceProps> = props => {
  /** 客服列表 */
  const groups = useRef<string[]>([])

  /**
   * 提交表单
   */
  const submit = (): void => {
    props.onSubmit(groups.current)
  }

  /**
   * 取消提交表单
   */
  const cancel = (): void => {
    props.onCancel()
  }

  /**
   * 选取客服方法
   *
   * @param ids 客服id
   */
  const select = (ids: string[]): void => {
    groups.current = ids
  }

  return (
    <Modal open={props.open} title="修改产品客服" okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent' }} closable onOk={submit} onCancel={cancel}>
      <Form labelCol={{ span: 8 }} colon={false}>
        <Form.Item label="客服" name="customer_service">
          <CustomerServiceSelector onSelect={select} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ManageCustomerService
