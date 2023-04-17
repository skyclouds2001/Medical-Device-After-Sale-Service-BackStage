import React from 'react'
import { Form, Select, Button, Spin } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import useSwr from 'swr'
import { getAllProductModels } from '@/api'
import { services } from '@/data'

interface WorkOrderSearchProps {
  onSearch: (params: { product_id?: number; work_order_type?: number; sort?: 1 | -1 }) => void
  onReset: () => void
}

const WorkOrderSearch: React.FC<WorkOrderSearchProps> = props => {
  const [form] = Form.useForm()

  const { data: products, isLoading } = useSwr('/wizz/aftersale/product-model/all', getAllProductModels)

  /** 发起搜索 */
  const onSearch = (): void => {
    props.onSearch(form.getFieldsValue())
  }

  /** 取消搜索 */
  const onReset = (): void => {
    form.resetFields()
    props.onReset()
  }

  const sorts = [
    { label: '升序', value: 1 },
    { label: '降序', value: -1 },
  ]

  return (
    <>
      <Form form={form} name="work_order" layout="inline" className="my-5 self-start">
        <Form.Item name="product_id" label="产品">
          <Select placeholder="请选择产品" allowClear options={(products?.data ?? []).map(v => ({ label: v.model_name, value: v.model_id }))} notFoundContent={isLoading ? <Spin /> : '暂无数据'} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item name="work_order_type" label="工单类型">
          <Select placeholder="请选择工单类型" allowClear options={services.map(v => ({ label: v.text, value: v.id }))} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item name="sort" label="预约时间排序方式">
          <Select options={sorts} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent flex justify-center items-center" icon={<SearchOutlined />} onClick={onSearch}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button danger className="flex justify-center items-center" icon={<CloseOutlined />} onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default WorkOrderSearch
