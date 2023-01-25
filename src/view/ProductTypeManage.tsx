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

  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)

  const [showAddProductType, setShowAddProductType] = useState(false)
  const [showEditProductType, setShowEditProductType] = useState(false)
  const current = useRef<ProductType>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '产品大类管理' })
    void loadProductTypes()
  }, [])

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

  const deleteProductType = (product: ProductType): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前产品大类及其产品？',
      closable: true,
      okButtonProps: {
        className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent',
      },
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
      <div className="my-5 text-right w-[31rem]">
        <Button
          className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent"
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
        className="w-[31rem]"
      >
        <Table.Column width="200px" align="center" title="产品大类名称" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="300px"
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

      <AddProductType
        open={showAddProductType}
        onSubmit={params => {
          void addProductTypes(params)
        }}
        onCancel={() => {
          setShowAddProductType(false)
        }}
      />

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
