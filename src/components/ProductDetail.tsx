import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Table, App } from 'antd'
import { getProductModelByType, removeProductModel, removeSingleServer, updateProductModel } from '@/apis'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductModel } from '@/model'

interface ProductDetailProps {
  id?: number
}

const { Column } = Table

export default function ProductDetail(props: ProductDetailProps): JSX.Element {
  const { message } = App.useApp()

  const [products, setProducts] = useState<ProductModel[]>([])
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    void loadProductModels()
  }, [])

  const loadProductModels = async (): Promise<void> => {
    setLoading(true)
    try {
      if (props.id === undefined) return
      const res = await getProductModelByType(props.id)
      if (res.code === 0) {
        setProducts(res.data)
        setTotal(res.data.length)
      } else {
        void message.error({
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

  const editProductModel = (product: ProductModel): void => {
    let name = ''
    Modal.confirm({
      title: '编辑产品信息',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品名称" name="name">
            <Input className="rounded-xl mx-2" placeholder="请输入产品名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        const res = await updateProductModel(product.model_id, name, product.type_id)
        if (res.code === 0) {
          void message.success({
            content: '更新成功'
          })
          void loadProductModels()
        } else {
          void message.error({
            content: res.data
          })
        }
      }
    })
  }

  const removeProductDetail = (product: ProductModel): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前产品？',
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: () => {
        removeProductModel(product.model_id)
          .then(res => {
            if (res.code === 0) {
              void message.success({
                content: '删除成功'
              })
              void loadProductModels()
            } else {
              void message.error({
                content: res.data
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
        removeSingleServer(product.model_id)
          .then(res => {
            if (res.code === 0) {
              void message.success({
                content: '删除成功'
              })
              void loadProductModels()
            } else {
              void message.error({
                content: res.data
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    })
  }

  return (
    <>
      {/* 产品类型列表 */}
      <Table
        dataSource={products}
        bordered
        rowKey="model_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total,
          pageSize: DEFAULT_PAGE_SIZE
        }}
        onChange={pagination => setPageNum(pagination.current ?? 1)}
      >
        <Column align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Column align="center" title="产品大类" dataIndex="type_name" key="type_name" />
        <Column
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductModel) => (
            <>
              <Button type="link" onClick={() => editProductModel(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => removeProductDetail(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}
