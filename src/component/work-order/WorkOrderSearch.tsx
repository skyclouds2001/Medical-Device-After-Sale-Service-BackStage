import React from 'react'
import { Form, Input, Select, Spin } from 'antd'
import useSwr from 'swr'
import { getAllProducts } from '@/api'
import { services } from '@/data'

export interface SearchProps {
  product?: number
  type?: number
  time: number
  status?: number
  customer: string
}

export const initialValues: SearchProps = {
  customer: '',
  product: -1,
  type: -1,
  time: 1,
  status: -1,
}

const sorts: Array<{ label: string; value: number }> = [
  { label: '创建时间', value: 1 },
  { label: '预约时间', value: 2 },
]

const statuses: Array<{ label: string; value: number }> = [
  { label: '所有', value: -1 },
  { label: '处理中', value: 0 },
  { label: '已处理', value: 1 },
]

interface WorkOrderSearchProps {
  onFilter: (params: SearchProps) => void
}

const WorkOrderSearch: React.FC<WorkOrderSearchProps> = props => {
  const [form] = Form.useForm<SearchProps>()

  const { data: products, isLoading } = useSwr('/wizz/aftersale/product-model/all', getAllProducts)

  return (
    <>
      <Form form={form} name="work_order" layout="inline" className="my-5" initialValues={initialValues} onValuesChange={(_, params) => props.onFilter(params)}>
        <Form.Item name="customer" label="客户名称" className="my-2">
          <Input placeholder="请输入客户名称" autoComplete="off" className="py-0 rounded-sm" style={{ lineHeight: '30px' }} />
        </Form.Item>
        <Form.Item name="product" label="产品名称" className="my-2">
          <Select placeholder="请选择产品名称" options={[{ label: '所有', value: -1 }, ...(products?.data ?? []).map(v => ({ label: v.model_name, value: v.model_id }))]} notFoundContent={isLoading ? <Spin /> : '暂无数据'} className="w-[200px]" />
        </Form.Item>
        <Form.Item name="type" label="服务类型" className="my-2">
          <Select placeholder="请选择服务类型" options={[{ label: '所有', value: -1 }, ...services.map(v => ({ label: v.text, value: v.id }))]} className="w-[200px]" />
        </Form.Item>
        <Form.Item name="time" label="时间排序方式" className="my-2">
          <Select options={sorts} className="w-[200px]" />
        </Form.Item>
        <Form.Item name="status" label="工单状态" className="my-2">
          <Select placeholder="请选择工单状态" options={statuses} className="w-[200px]" />
        </Form.Item>
      </Form>
    </>
  )
}

export default WorkOrderSearch
