import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { App, Button, Form, Modal, Table } from 'antd'
import CustomerServiceSelector from '@/component/CustomerServiceSelector'
import { getAllProductModels, getSingleServer, manageCustomerService } from '@/api'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductModel, Service } from '@/model'
import type { CustomAction } from '@/store'

interface ProductModelWithServer extends ProductModel {
  services?: Service[]
}

const CustomerServiceManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

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
    dispatch<CustomAction>({ type: 'title/update', title: '客服管理' })
    void loadAllProductModels()
  }, [])

  /**
   * 加载全部产品列表
   */
  const loadAllProductModels = async (): Promise<void> => {
    try {
      setLoading(true)

      const res = await getAllProductModels()

      if (res.code !== 0) {
        void message.error({
          content: res.data
        })
      }

      const products = res.data as ProductModelWithServer[]
      products.forEach(v => (v.services = []))

      setAllProducts(products)
      setTotalNum(products.length)
      setPageNum(1)

      loadProductModels(products, 1)
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => setLoading(false), 250)
    }
  }

  /**
   * 加载产品列表（即当前表格显示产品列表）
   */
  const loadProductModels = (all: ProductModelWithServer[] = allProducts, page = pageNum): void => {
    const products = all.slice((page - 1) * DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE)

    setProducts(products)

    /* eslint-disable-next-line */
    Promise.allSettled(products.map(v => getSingleServer(v.model_id).then(res => {
          if (res.code === 0) {
            v.services = res.data.server_info_list
          } else {
            void message.error({
              content: res.data.toString().replace(/该产品型号/, v.model_name)
            })
          }
          return v
        })
      )
    ).then(res => {
      setProducts(res.filter(v => v.status === 'fulfilled').map(v => (v.status === 'fulfilled' ? v.value : null)) as ProductModelWithServer[])
    })
  }

  /**
   *  编辑产品对应客服
   * @param product 产品
   */
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
          if (res.code === 0) {
            loadProductModels()
            void message.success({
              content: '修改成功'
            })
          } else {
            void message.error({
              content: res.data
            })
          }
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  return (
    <>
      {/* 产品客服信息表格 */}
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
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
          void loadProductModels(allProducts, pagination.current)
        }}
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
                管理客服
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default CustomerServiceManage
