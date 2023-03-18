import React from 'react'
import { Table, Image, Button } from 'antd'
import img from '@/asset/img.svg'
import type { ProductModel } from '@/model'

interface ProductModelTableProps {
  products: ProductModel[]
  loading: boolean
  onEdit: (product: ProductModel) => void
  onRemove: (id: number) => void
}

const ProductModelTable: React.FC<ProductModelTableProps> = props => {
  return (
    <>
      <Table dataSource={props.products} bordered rowKey="model_id" loading={props.loading} pagination={false}>
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="产品大类" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="产品图片"
          key="pic_url"
          render={(_, record: ProductModel) => (
            <>
              <Image width={100} alt={record.model_name} src={record.pic_url ?? img} fallback={img} preview={false} />
            </>
          )}
        />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductModel) => (
            <>
              <Button type="link" onClick={() => props.onEdit?.(record)}>
                编辑
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
