import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { App, Button, Table } from 'antd'
import ManageCustomerService from '@/component/ManageCustomerService'
import { getAllProductModels, getSingleServer, manageCustomerService } from '@/api'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductModel } from '@/model'
import type { CustomAction } from '@/store'

const CustomerServiceManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  /** 所有产品列表(不含客服信息) */
  const [allProducts, setAllProducts] = useState<ProductModel[]>([])
  /** 当前产品列表(包含客服信息) */
  const [products, setProducts] = useState<ProductModel[]>([])
  /** 客户总数 */
  const [totalNum, setTotalNum] = useState(0)
  /** 标记客户列表是否处于加载状态 */
  const [isLoading, setLoading] = useState(false)
  /** 客户列表当前页数 */
  const [pageNum, setPageNum] = useState(1)

  /** 控制编辑产品类型对应客服信息表单显示 */
  const [showEdit, setShowEdit] = useState(false)
  /** 当前产品类型信息 */
  const current = useRef<ProductModel>()

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

      const commonCustomerService: ProductModel = {
        model_id: -1,
        model_name: '通用客服',
        pic_url: '',
        type_id: -1,
        type_name: '——',
      }

      const res = await getAllProductModels()

      if (res.code !== 0) {
        void message.error({
          content: res.data,
        })
      }

      const products = res.data
      products.unshift(commonCustomerService)
      products.forEach(v => (v.services = []))

      setAllProducts(products)
      setTotalNum(products.length)
      setPageNum(1)

      loadProductModels(products, 1)
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 250)
    }
  }

  /**
   * 加载产品列表（即当前表格显示产品列表）
   *
   * @param all 所有产品列表
   * @param page 当前产品表格页数
   */
  const loadProductModels = (all: ProductModel[] = allProducts, page = pageNum): void => {
    const products = all.slice((page - 1) * DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE)

    setProducts(products)

    Promise.allSettled(
      /* eslint-disable-next-line */
      products.map(v =>
        getSingleServer(v.model_id).then(res => {
          if (res.code === 0) {
            v.services = res.data.server_info_list
          } else {
            void message.error({
              content: res.data.toString().replace(/该产品型号/, v.model_name),
            })
          }
          return v
        }),
      ),
    )
      .then(res => {
        setProducts(res.filter(v => v.status === 'fulfilled').map(v => (v.status === 'fulfilled' ? v.value : null)) as ProductModel[])
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * 编辑产品对应客服
   *
   * @param ids 客服ids
   */
  const editService = async (ids: string[]): Promise<void> => {
    if (current.current === undefined) return
    try {
      const res = await manageCustomerService(current.current.model_id, ids)
      if (res.code === 0) {
        loadProductModels()
        void message.success({
          content: '修改成功',
        })
        setShowEdit(false)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (err) {
      console.error(err)
    }
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
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
          loadProductModels(allProducts, pagination.current)
        }}
        className="w-[50rem]"
      >
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="所属大类" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="对应客服"
          key="customer-service"
          render={(_, record: ProductModel) => (
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
          render={(_, record: ProductModel) => (
            <>
              <Button
                type="link"
                onClick={() => {
                  current.current = record
                  setShowEdit(true)
                }}
              >
                管理客服
              </Button>
            </>
          )}
        />
      </Table>

      {/* 管理客服表单 */}
      <ManageCustomerService
        open={showEdit}
        onSubmit={props => {
          void editService(props)
        }}
        onCancel={() => {
          setShowEdit(false)
        }}
      />
    </>
  )
}

export default CustomerServiceManage
