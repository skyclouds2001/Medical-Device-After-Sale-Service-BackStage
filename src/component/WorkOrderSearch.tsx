import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { services } from '@/data'

interface WorkOrderSearchProps {
  onSearch: (params: { product_name?: string; work_order_type: number }) => void
  onReset: () => void
}

const WorkOrderSearch: React.FC<WorkOrderSearchProps> = props => {
  const [form] = Form.useForm()

  /** 发起搜索 */
  const onSearch = (): void => {
    props.onSearch(form.getFieldsValue())
  }

  /** 取消搜索 */
  const onReset = (): void => {
    form.resetFields()
    props.onReset()
  }

  return (
    <>
      <Form form={form} name="work_order" layout="inline" className="my-5 self-start">
        <Form.Item name="work_order_type" label="工单类型">
          <Select placeholder="请选择工单类型" allowClear options={services.map(v => ({ label: v.text, value: v.id }))} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item name="product_name" label="产品名称">
          <Input name="product_name" placeholder="请输入产品名称" className="rounded" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" onClick={onSearch}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default WorkOrderSearch
