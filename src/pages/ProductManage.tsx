import React, { useState, useEffect } from 'react'
import { Button, message, Table, Modal } from 'antd'
import ProductDetail from '@/components/ProductDetail'
import { getAllProductTypes } from '@/apis'
import type ProductType from '@/model/product_type'

const { Column } = Table

const DEFAULT_PAGE_SIZE = 10

export default function ProductManage(): JSX.Element {
  const [messageApi, messageContextHolder] = message.useMessage()

  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)

  const [isShow, setShow] = useState(false)
  const [current, updateCurrent] = useState<ProductType>()

  useEffect(() => {
    void loadProductTypes()
  }, [])

  const loadProductTypes = async (): Promise<void> => {
    setLoading(true)
    try {
      const res = await getAllProductTypes()
      if (res.code === 0) {
        setProductTypes(res.data)
      } else {
        void messageApi.error({
          content: res.data
        })
      }
    } catch (err) {
      console.error(err)
    }
    setTimeout(() => {
      setLoading(false)
    }, 250)
  }

  return (
    <>
      {/* AntD Message 动态组件 */}
      {messageContextHolder}

      {/* 添加产品大类按钮区域 */}
      <div className="my-5 text-right">
        <Button className="text-blue-500" type="primary" onClick={() => 1}>
          添加产品大类
        </Button>
      </div>

      {/* 产品大类对应产品类型列表 */}
      <Modal destroyOnClose open={isShow} closable={true} title={`产品-${current?.type_name ?? ''}`} footer={null} okButtonProps={{ className: 'text-blue-500' }} onCancel={() => setShow(false)}>
        <ProductDetail id={current?.type_id} />
      </Modal>

      {/* 产品大类列表 */}
      <Table
        dataSource={productTypes}
        bordered
        rowKey="type_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          pageSize: DEFAULT_PAGE_SIZE
        }}
        onChange={pagination => setPageNum(pagination.current ?? 1)}
      >
        <Column align="center" title="产品大类名称" dataIndex="type_name" key="type_name" />
        <Column
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductType) => (
            <>
              <Button
                type="link"
                onClick={() => {
                  setShow(true)
                  updateCurrent(record)
                }}
              >
                查看
              </Button>
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
