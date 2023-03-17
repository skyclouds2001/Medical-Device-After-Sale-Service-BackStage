import React from 'react'
import { Table, Button } from 'antd'
import type { ProductType } from '@/model'

interface ProductModelTableProps {
  products: ProductType[]
  loading: boolean
  onEdit: (product: ProductType) => void
  onRemove: (id: number) => void
}

const ProductTypeTable: React.FC<ProductModelTableProps> = props => {
  return (
    <>
      <Table dataSource={props.products} bordered rowKey="type_id" loading={props.loading} pagination={false}>
        <Table.Column width="200px" align="center" title="产品大类名称" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductType) => (
            <>
              <Button type="link" onClick={() => props.onEdit?.(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => props.onRemove?.(record.type_id)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default ProductTypeTable
