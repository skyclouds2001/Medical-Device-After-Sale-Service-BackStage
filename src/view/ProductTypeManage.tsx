import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, Modal, App } from 'antd'
import { addProductType, getAllProductTypes, removeCustomerService, removeProductType, updateProductType } from '@/api'
import AddProductType from '@/component/AddProductType'
import EditProductType from '@/component/EditProductType'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductType } from '@/model'
import type { CustomAction } from '@/store'

const ProductTypeManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  /** 产品大类列表 */
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  /** 产品大类表格加载中标记 */
  const [isLoading, setLoading] = useState(false)
  /** 产品大类表格当前页数 */
  const [pageNum, setPageNum] = useState(1)
  /** 产品大类总数 */
  const [total, setTotal] = useState(0)

  /** 控制添加产品大类表单显示 */
  const [showAddProductType, setShowAddProductType] = useState(false)
  /** 控制编辑产品大类表格显示 */
  const [showEditProductType, setShowEditProductType] = useState(false)
  /** 当前产品大类 */
  const current = useRef<ProductType>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '产品大类管理' })
    void loadProductTypes()
  }, [])

  /**
   * 加载产品大类信息方法
   */
  const loadProductTypes = async (): Promise<void> => {
    setLoading(true)
    try {
      const res = await getAllProductTypes()
      if (res.code === 0) {
        const types = res.data
        setProductTypes(types)
        setTotal(types.length)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 250)
    }
  }

  /**
   * 添加产品大类方法
   *
   * @param params 待添加产品大类信息
   */
  const addProductTypes = async (params: Omit<ProductType, 'type_id'>): Promise<void> => {
    try {
      const res = await addProductType(params.type_name)
      if (res.code === 0) {
        void message.success({
          content: '添加成功',
        })
        void loadProductTypes()
        setShowAddProductType(false)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 编辑产品大类方法
   *
   * @param type 待更新产品大类信息
   */
  const editProductType = async (type: ProductType): Promise<void> => {
    try {
      const res = await updateProductType(type.type_id, type.type_name)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        void loadProductTypes()
        setShowEditProductType(false)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 移除产品大类方法
   *
   * @param product 产品大类信息
   */
  const deleteProductType = (product: ProductType): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前产品大类及其产品？',
      okText: '删除',
      okType: 'danger',
      closable: true,
      onOk: async () => {
        try {
          const res1 = await removeProductType(product.type_id)
          if (res1.code !== 0) {
            void message.error({
              content: res1.data,
            })
          }

          const res2 = await removeCustomerService(product.type_id)
          if (res2.code !== 0) {
            void message.error({
              content: res2.data,
            })
          }

          if (res1.code === 0 && res2.code === 0) {
            void message.success({
              content: '删除成功',
            })
          }

          void loadProductTypes()
        } catch (err) {
          console.error(err)
        }
      },
    })
  }

  return (
    <>
      {/* 添加产品及大类按钮区域 */}
      <div className="my-5 text-right w-[25rem]">
        <Button
          className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent"
          type="primary"
          onClick={() => {
            setShowAddProductType(true)
          }}
        >
          添加产品大类
        </Button>
      </div>

      {/* 产品大类列表 */}
      <Table
        dataSource={productTypes}
        bordered
        rowKey="type_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total,
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
        }}
        className="w-[25rem]"
      >
        <Table.Column width="200px" align="center" title="产品大类名称" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductType) => (
            <>
              <Button
                type="link"
                onClick={() => {
                  setShowEditProductType(true)
                  current.current = record
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  deleteProductType(record)
                }}
              >
                删除
              </Button>
            </>
          )}
        />
      </Table>

      {/* 添加产品大类表单 */}
      <AddProductType
        open={showAddProductType}
        onSubmit={params => {
          void addProductTypes(params)
        }}
        onCancel={() => {
          setShowAddProductType(false)
        }}
      />

      {/* 编辑产品大类表单 */}
      <EditProductType
        open={showEditProductType}
        onSubmit={params => {
          void editProductType(params)
        }}
        onCancel={() => {
          setShowEditProductType(false)
        }}
        properties={current.current as ProductType}
      />
    </>
  )
}

export default ProductTypeManage
