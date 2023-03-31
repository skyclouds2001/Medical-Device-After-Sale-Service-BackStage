import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { App, Row, Col, Button } from 'antd'
import useSwr from 'swr'
import { getAllProductModels, removeProductModel, removeSingleServer, addProductModel, updateProductModel } from '@/api'
import AddProductModelForm from '@/component/product/AddProductModelForm'
import EditProductModelForm from '@/component/product/EditProductModelForm'
import ProductModelTable from '@/component/product/ProductModelTable'
import type { ProductModel } from '@/model'
import type { CustomAction } from '@/store'

const ProductManage: React.FC = () => {
  const { modal, message } = App.useApp()
  const dispatch = useDispatch()

  const { data, isLoading, mutate } = useSwr('/wizz/aftersale/product-model/all', getAllProductModels)

  const [showAddProductModel, setShowAddProductModel] = useState(false)
  const [showEditProductModel, setShowEditProductModel] = useState(false)

  const currentModel = useRef<ProductModel>()

  const handleAddProductModel = async (params: Omit<ProductModel, 'model_id'>): Promise<void> => {
    try {
      const res = await addProductModel(params.model_name, params.pic_url)
      if (res.code === 0) {
        void message.success({
          content: '添加成功',
        })
        setShowAddProductModel(false)
      } else {
        void message.error({
          content: res.data ?? '添加失败',
        })
      }
    } catch {
      void message.error({
        content: '添加失败',
      })
    } finally {
      void mutate()
    }
  }

  const handleEditProductModel = async (product: ProductModel): Promise<void> => {
    try {
      const res = await updateProductModel(product.model_id, product.model_name, product.pic_url)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        setShowEditProductModel(false)
      } else {
        void message.error({
          content: res.data ?? '编辑失败',
        })
      }
    } catch {
      void message.error({
        content: '编辑失败',
      })
    } finally {
      void mutate()
    }
  }

  const handleRemoveProductModel = (id: number): void => {
    modal.confirm({
      title: '警告',
      content: '确认移除当前产品？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      closable: true,
      onOk: async () => {
        try {
          const res1 = await removeProductModel(id)
          if (res1.code !== 0) {
            void message.error({
              content: res1.data ?? '删除失败',
            })
          }

          const res2 = await removeSingleServer(id)
          if (res2.code !== 0) {
            void message.error({
              content: res2.data ?? '删除失败',
            })
          }

          if (res1.code === 0 && res2.code === 0) {
            void message.success({
              content: '删除成功',
            })
          }
        } catch {
          void message.error({
            content: '删除失败',
          })
        } finally {
          void mutate()
        }
      },
    })
  }

  const openEditModelForm = (product: ProductModel): void => {
    currentModel.current = product
    setShowEditProductModel(true)
  }

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '产品管理' })
  }, [])

  return (
    <>
      <Row className="w-full" gutter={40}>
        <Col span={24}>
          <div className="w-full py-5 text-right">
            <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={() => setShowAddProductModel(true)}>
              添加产品
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="w-full" gutter={40}>
        <Col span={24}>
          <ProductModelTable products={Array.isArray(data?.data) ? data?.data ?? [] : []} loading={isLoading} onEdit={openEditModelForm} onRemove={handleRemoveProductModel} />
        </Col>
      </Row>

      <AddProductModelForm open={showAddProductModel} onSubmit={handleAddProductModel} onCancel={() => setShowAddProductModel(false)} />

      <EditProductModelForm open={showEditProductModel} onSubmit={handleEditProductModel} onCancel={() => setShowEditProductModel(false)} properties={currentModel.current} />
    </>
  )
}

export default ProductManage
