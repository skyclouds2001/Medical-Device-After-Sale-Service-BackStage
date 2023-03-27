import React from 'react'
import { Table, Button } from 'antd'
import type { ProductType } from '@/model'

interface ProductModelTableProps {
  products: ProductType[]
  loading: boolean
  current: number | null
  onSelect: (id: number) => void
  onEdit: (product: ProductType) => void
  onRemove: (id: number) => void
}

const ProductTypeTable: React.FC<ProductModelTableProps> = props => {
  const handleEdit = (e: React.MouseEvent, type: ProductType): void => {
    e.stopPropagation()
    props.onEdit(type)
  }

  const handleRemove = (e: React.MouseEvent, type: ProductType): void => {
    e.stopPropagation()
    props.onRemove(type.type_id)
  }

  return (
    <>
      <Table dataSource={props.products} bordered rowKey="type_id" loading={props.loading} pagination={{ hideOnSinglePage: true }} rowSelection={{ selectedRowKeys: props.current !== null ? [props.current] : [], type: 'radio', onSelect: type => props.onSelect(type.type_id) }} onRow={record => ({ onClick: () => props.onSelect(record.type_id) })}>
        <Table.Column width="200px" align="center" title="产品大类名称" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductType) => (
            <>
              <Button type="link" onClick={e => handleEdit(e, record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={e => handleRemove(e, record)}>
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
