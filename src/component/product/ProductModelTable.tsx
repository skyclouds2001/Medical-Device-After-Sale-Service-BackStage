import React from 'react'
import { Table, Image, Button, Spin } from 'antd'
import type { Product } from '@/model'

interface ProductModelTableProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onRemove: (id: number) => void
}

const ProductModelTable: React.FC<ProductModelTableProps> = props => {
  return (
    <>
      <Table dataSource={props.products} bordered rowKey="model_id" loading={props.loading} pagination={{ hideOnSinglePage: true }}>
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column
          width="200px"
          align="center"
          title="产品图标"
          key="pic_url"
          render={(_, record: Product) => (
            <>
              <Image width={100} alt={record.model_name} src={record.pic_url} placeholder={<Spin />} preview={false} />
            </>
          )}
        />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: Product) => (
            <>
              <Button type="link" onClick={() => props.onEdit?.(record)}>
                修改
              </Button>
              <Button type="link" danger onClick={() => props.onRemove?.(record.model_id)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default ProductModelTable
