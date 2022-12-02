import React, { useState } from 'react'
import { Button, Table } from 'antd'
import type ProductModel from '@/model/product_model'

interface ProductDetailProps {
  id?: number
}

const { Column } = Table

const DEFAULT_PAGE_SIZE = 10

export default function ProductDetail(props: ProductDetailProps): JSX.Element {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  console.log(props.id)

  return (
    <>
      <Table
        dataSource={products}
        bordered
        rowKey="customer_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total,
          pageSize: DEFAULT_PAGE_SIZE
        }}
        onChange={pagination => setPageNum(pagination.current ?? 1)}
      >
        <Column align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Column
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductModel) => (
            <>
              <Button type="link" onClick={() => 1}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => 1}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}
