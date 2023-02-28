import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Table, App, Image } from 'antd'
import { addProductModel, getAllProductModels, manageCustomerService, removeProductModel, removeSingleServer, updateProductModel } from '@/api'
import img from '@/asset/img.svg'
import AddProductModel from '@/component/AddProductModel'
import EditProductModel from '@/component/EditProductModel'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductModel } from '@/model'
import type { CustomAction } from '@/store'

const ProductModelManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  /** 产品类型列表 */
  const [products, setProducts] = useState<ProductModel[]>([])
  /** 产品类型表格加载中标记 */
  const [isLoading, setLoading] = useState(false)
  /** 产品类型表格当前页数 */
  const [pageNum, setPageNum] = useState(1)
  /** 产品类型总数 */
  const [total, setTotal] = useState(0)

  /** 控制添加产品类型表单显示 */
  const [showAddProductModel, setShowAddProductModel] = useState(false)
  /** 控制编辑产品类型表格显示 */
  const [showEditProductModel, setShowEditProductModel] = useState(false)
  /** 当前产品类型 */
  const current = useRef<ProductModel>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '产品型号管理' })
    void loadProductModels()
  }, [])

  /**
   * 加载产品类型信息方法
   */
  const loadProductModels = async (): Promise<void> => {
    setLoading(true)
    try {
      const res = await getAllProductModels()
      if (res.code === 0) {
        const products = res.data
        setProducts(products)
        setTotal(products.length)
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
   * 添加产品类型方法
   *
   * @param params 待添加产品类型信息
   */
  const addProductModels = async (params: Omit<ProductModel, 'model_id' | 'type_name' | 'services'> & { services: string[] }): Promise<void> => {
    try {
      const res1 = await addProductModel(params.model_name, params.type_id, params.pic_url)
      if (res1.code !== 0) {
        void message.error({
          content: res1.data,
        })
      }

      const res2 = await manageCustomerService(params.type_id, params.services)
      if (res2.code !== 0) {
        void message.error({
          content: res2.data,
        })
      }

      if (res1.code === 0 && res2.code === 0) {
        void message.success({
          content: '添加成功',
        })
        setShowAddProductModel(false)
        void loadProductModels()
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 编辑产品类型方法
   *
   * @param model 待更新产品类型信息
   */
  const editProductModel = async (model: Omit<ProductModel, 'type_name' | 'services'>): Promise<void> => {
    try {
      const res = await updateProductModel(model.model_id, model.model_name, model.type_id, model.pic_url)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        setShowEditProductModel(false)
        void loadProductModels()
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
   * 移除产品类型方法
   *
   * @param product 产品类型信息
   */
  const deleteProductDetail = (product: ProductModel): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前产品？',
      okText: '删除',
      okType: 'danger',
      closable: true,
      onOk: async () => {
        try {
          const res1 = await removeProductModel(product.model_id)
          if (res1.code !== 0) {
            void message.error({
              content: res1.data,
            })
          }

          const res2 = await removeSingleServer(product.model_id)
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

          void loadProductModels()
        } catch (err) {
          console.error(err)
        }
      },
    })
  }

  return (
    <>
      {/* 添加产品按钮区域 */}
      <div className="my-5 text-right w-[50rem]">
        <Button
          className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent"
          type="primary"
          onClick={() => {
            setShowAddProductModel(true)
          }}
        >
          添加产品型号
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
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
        }}
        className="w-[50rem]"
      >
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="产品大类" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="产品图片"
          key="pic_url"
          render={(_, record: ProductModel) => (
            <>
              <Image width={100} height={100} alt="" src={record.pic_url ?? img} fallback={img} preview={false} />
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
                  setShowEditProductModel(true)
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  deleteProductDetail(record)
                }}
              >
                删除
              </Button>
            </>
          )}
        />
      </Table>

      {/* 添加产品类型表单 */}
      <AddProductModel
        open={showAddProductModel}
        onSubmit={params => {
          void addProductModels(params)
        }}
        onCancel={() => {
          setShowAddProductModel(false)
        }}
      />

      {/* 编辑产品类型表单 */}
      <EditProductModel
        open={showEditProductModel}
        onSubmit={params => {
          void editProductModel(params)
        }}
        onCancel={() => {
          setShowEditProductModel(false)
        }}
        properties={current.current as ProductModel}
      />
    </>
  )
}

export default ProductModelManage
