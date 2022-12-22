import React, { useEffect, useState } from 'react'
import { Button, Form, message, Modal, Table } from 'antd'
import CustomerServiceSelector from '@/components/CustomerServiceSelector'
import { getAllProductModels, getSingleServer, manageCustomerService, removeCustomerService } from '@/apis'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type ProductModel from '@/model/product_model'
import type Service from '@/model/service'

interface ProductModelWithServer extends ProductModel {
  services?: Service[]
}

export default function CustomerServiceManage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()

  /** 所有产品列表 */
  const [allProducts, setAllProducts] = useState<ProductModelWithServer[]>([])
  /** 产品列表 */
  const [products, setProducts] = useState<ProductModelWithServer[]>([])
  /** 客户总数 */
  const [totalNum, setTotalNum] = useState(0)
  /** 标记客户列表是否处于加载状态 */
  const [isLoading, setLoading] = useState(false)
  /** 客户列表当前页数 */
  const [pageNum, setPageNum] = useState(1)

  useEffect(() => {
    void loadAllProductModels()
  }, [])

  useEffect(() => {
    void loadProductModels()
  }, [pageNum])

  /**
   * 加载全部产品列表
   */
  const loadAllProductModels = (): void => {
    setLoading(true)
    getAllProductModels()
      .then(res => {
        if (res.code === 0) {
          const products = res.data as ProductModelWithServer[]
          products.forEach(v => (v.services = []))
          setAllProducts(products)
          setTotalNum(products.length)
          loadProductModels(products).finally(() => {
            setTimeout(() => {
              setLoading(false)
            }, 250)
          })
        } else {
          void messageApi.error({
            content: res.data
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * 加载产品列表
   */
  const loadProductModels = async (all: ProductModelWithServer[] = allProducts): Promise<void> => {
    const products = all.slice((pageNum - 1) * DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE)
    for await (const p of products) {
      const res = await getSingleServer(p.model_id)
      p.services = res.data.server_info_list
    }
    setProducts(products)
  }

  const editService = (product: ProductModelWithServer): void => {
    let services: number[] = []
    Modal.confirm({
      title: '修改产品客服',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="客服" name="customer_service">
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
          const res = await manageCustomerService(product.model_id, services)
          console.log(res)
          if (res.code === 0) {
            void messageApi.success({
              content: '修改成功'
            })
            void loadAllProductModels()
          } else {
            void messageApi.error({
              content: res.data
            })
          }
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  /**
   * 移除产品对应客服
   * @param product 产品
   */
  const removeService = (product: ProductModelWithServer): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除产品对应客服？',
      okText: '删除',
      okType: 'danger',
      closable: true,
      onOk: async () => {
        const res = await removeCustomerService(product.model_id)
        if (res.code === 0) {
          void messageApi.success({
            content: '删除成功'
          })
          void loadAllProductModels()
        } else {
          void messageApi.error({
            content: res.data
          })
        }
      }
    })
  }

  return (
    <>
      {/* AntD Message 动态组件 */}
      {contextHolder}

      {/* 产品信息表格 */}
      <Table
        dataSource={products}
        bordered
        rowKey="model_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total: totalNum,
          pageSize: DEFAULT_PAGE_SIZE
        }}
        onChange={pagination => setPageNum(pagination.current ?? 1)}
        style={{ width: '800px' }}
      >
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="所属大类" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="对应客服"
          key="customer-service"
          render={(_, record: ProductModelWithServer) => (
            <>
              {record.services?.map(v => (
                <div key={v.user_id}>{v.server_name}</div>
              ))}
            </>
          )}
        />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductModelWithServer) => (
            <>
              <Button type="link" onClick={() => editService(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => removeService(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}
