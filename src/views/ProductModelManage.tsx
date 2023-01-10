import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, Input, Modal, Table, App } from 'antd'
import { addProductModel, getProductModelByType, manageCustomerService, removeProductModel, removeSingleServer, updateProductModel } from '@/apis'
import CustomerServiceSelector from '@/components/CustomerServiceSelector'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductModel } from '@/model'

const ProductModelManage: React.FC = () => {
  const { message } = App.useApp()

  const { id } = useParams<'id'>()

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
      const res = await getProductModelByType(parseInt(typeof id === 'string' ? id : '0'))
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
    } finally {
      setTimeout(() => setLoading(false), 250)
    }
  }

  const addProductModels = (): void => {
    let name = ''
    let services: number[] = []
    Modal.confirm({
      title: '添加产品',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品名称" name="name">
            <Input className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
          <Form.Item label="产品所属客服" name="service">
            <CustomerServiceSelector onSelect={v => (services = v)} />
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res1 = await addProductModel(name, parseInt(typeof id === 'string' ? id : '0'))
          if (res1.code === 0) {
            void message.success({
              content: '添加成功'
            })
          } else {
            void message.error({
              content: res1.data
            })
          }

          const res2 = await manageCustomerService(parseInt(typeof id === 'string' ? id : '0'), services)
          if (res2.code === 0) {
            void message.success({
              content: '添加成功'
            })
          } else {
            void message.error({
              content: res2.data
            })
          }
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  const editProductModel = (product: ProductModel): void => {
    let name = ''
    Modal.confirm({
      title: '编辑产品信息',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品名称" name="name">
            <Input className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" value={name} onChange={e => (name = e.target.value)} />
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

  const deleteProductDetail = (product: ProductModel): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前产品？',
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res1 = await removeProductModel(product.model_id)
          if (res1.code === 0) {
            void message.success({
              content: '删除成功'
            })
          } else {
            void message.error({
              content: res1.data
            })
          }

          const res2 = await removeSingleServer(product.model_id)
          if (res2.code === 0) {
            void message.success({
              content: '删除成功'
            })
          } else {
            void message.error({
              content: res2.data
            })
          }

          void loadProductModels()
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  return (
    <>
      {/* 添加产品按钮区域 */}
      <div className="my-5 text-right" style={{ width: '600px' }}>
        <Button className="text-blue-500 hover:text-white" type="primary" onClick={() => addProductModels()}>
          添加产品
        </Button>
      </div>

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
        style={{ width: '600px' }}
      >
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="产品大类" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductModel) => (
            <>
              <Button type="link" onClick={() => editProductModel(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => deleteProductDetail(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default ProductModelManage
