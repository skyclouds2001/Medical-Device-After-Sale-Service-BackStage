import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { App, Row, Col, Button } from 'antd'
import useSwr from 'swr'
import { getAllProductTypes, getAllProductModels, removeProductType, removeCustomerService, removeProductModel, removeSingleServer, addProductType, addProductModel, manageCustomerService, updateProductModel, updateProductType } from '@/api'
import AddProductTypeForm from '@/component/product/AddProductTypeForm'
import AddProductModelForm from '@/component/product/AddProductModelForm'
import EditProductTypeForm from '@/component/product/EditProductTypeForm'
import EditProductModelForm from '@/component/product/EditProductModelForm'
import ProductTypeTable from '@/component/product/ProductTypeTable'
import ProductModelTable from '@/component/product/ProductModelTable'
import type { ProductModel, ProductType } from '@/model'
import type { CustomAction } from '@/store'

const ProductManage: React.FC = () => {
  const { modal, message } = App.useApp()
  const dispatch = useDispatch()

  const { data: types, isLoading: isTypeLoading, mutate: typeMutate } = useSwr('/wizz/aftersale/product-model/getByTypeId', getAllProductTypes)
  const { data: models, isLoading: isModelLoading, mutate: modelMutate } = useSwr('/wizz/aftersale/product-model/all', getAllProductModels)

  const [activeProductType, setActiveProductType] = useState<number | null>(null)

  const [showAddProductType, setShowAddProductType] = useState(false)
  const [showEditProductType, setShowEditProductType] = useState(false)
  const [showAddProductModel, setShowAddProductModel] = useState(false)
  const [showEditProductModel, setShowEditProductModel] = useState(false)

  const currentModel = useRef<ProductModel>()
  const currentType = useRef<ProductType>()

  const handleAddProductType = async (params: Omit<ProductType, 'type_id'>): Promise<void> => {
    try {
      const res = await addProductType(params.type_name)
      if (res.code === 0) {
        void message.success({
          content: '添加成功',
        })
        setShowAddProductType(false)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch {
      void message.error({
        content: '添加失败',
      })
    } finally {
      void typeMutate()
    }
  }

  const handleAddProductModel = async (params: Omit<ProductModel, 'model_id' | 'type_name'> & { services: string[]; avatar: string }): Promise<void> => {
    try {
      const res1 = await addProductModel(params.model_name, params.type_id, params.pic_url)
      if (res1.code !== 0) {
        void message.error({
          content: res1.data,
        })
        return
      }

      const res2 = await manageCustomerService(res1.data, params.services, params.avatar)
      if (res2.code !== 0) {
        void message.error({
          content: res2.data,
        })
        void removeProductModel(res1.data)
        return
      }

      void message.success({
        content: '添加成功',
      })
      setShowAddProductModel(false)
    } catch {
      void message.error({
        content: '添加失败',
      })
    } finally {
      void modelMutate()
    }
  }

  const handleEditProductType = async (product: ProductType): Promise<void> => {
    try {
      const res = await updateProductType(product.type_id, product.type_name)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        setShowEditProductType(false)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch {
      void message.error({
        content: '编辑失败',
      })
    } finally {
      void typeMutate()
    }
  }

  const handleEditProductModel = async (product: Omit<ProductModel, 'type_name'>): Promise<void> => {
    try {
      const res = await updateProductModel(product.model_id, product.model_name, product.type_id, product.pic_url)
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
      void modelMutate()
    }
  }

  const handleRemoveProductType = (id: number): void => {
    modal.confirm({
      title: '警告',
      content: '确认移除当前产品大类？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      closable: true,
      onOk: async () => {
        try {
          const res1 = await removeProductType(id)
          if (res1.code !== 0) {
            void message.error({
              content: res1.data ?? '删除失败',
            })
          }

          const res2 = await removeCustomerService(id)
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
          void typeMutate()
        }
      },
    })
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
          void modelMutate()
        }
      },
    })
  }

  const openEditTypeForm = (product: ProductType): void => {
    currentType.current = product
    setShowEditProductType(true)
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
      <Row className="w-full" gutter={16}>
        <Col span={8}>
          <div className="w-full py-5 text-right">
            <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={() => setShowAddProductType(true)}>
              添加产品大类
            </Button>
          </div>
        </Col>
        <Col span={16}>
          <div className="w-full py-5 text-right">
            <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={() => setShowAddProductModel(true)}>
              添加产品型号
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="w-full" gutter={16}>
        <Col span={8}>
          <ProductTypeTable products={Array.isArray(types?.data) ? types?.data ?? [] : []} loading={isTypeLoading} onEdit={openEditTypeForm} onRemove={handleRemoveProductType} current={activeProductType} onSelect={id => setActiveProductType(id === activeProductType ? null : id)} />
        </Col>
        <Col span={16}>
          <ProductModelTable products={Array.isArray(models?.data) ? models?.data.filter(v => activeProductType === null || v.type_id === activeProductType) ?? [] : []} loading={isModelLoading} onEdit={openEditModelForm} onRemove={handleRemoveProductModel} />
        </Col>
      </Row>

      <AddProductTypeForm open={showAddProductType} onSubmit={handleAddProductType} onCancel={() => setShowAddProductType(false)} />

      <AddProductModelForm open={showAddProductModel} onSubmit={handleAddProductModel} onCancel={() => setShowAddProductModel(false)} />

      <EditProductTypeForm open={showEditProductType} onSubmit={handleEditProductType} onCancel={() => setShowEditProductType(false)} properties={currentType.current as ProductType} />

      <EditProductModelForm open={showEditProductModel} onSubmit={handleEditProductModel} onCancel={() => setShowEditProductModel(false)} properties={currentModel.current as ProductModel} />
    </>
  )
}

export default ProductManage
