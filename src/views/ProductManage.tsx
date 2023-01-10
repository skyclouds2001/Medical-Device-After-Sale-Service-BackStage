import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, Modal, Form, Input, Select, App } from 'antd'
import ProductDetail from '@/components/ProductDetail'
import { addProductModel, addProductType, getAllProductTypes, getDepartmentsAndStaffs, manageCustomerService, removeCustomerService, removeProductType, updateProductType } from '@/apis'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { ProductType, User } from '@/model'
import type { CustomAction } from '@/store'

const ProductManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)

  const [isShow, setShow] = useState(false)
  const [current, updateCurrent] = useState<ProductType>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '产品管理' })
    void loadProductTypes()
  }, [])

  const loadProductTypes = async (): Promise<void> => {
    setLoading(true)
    try {
      const res = await getAllProductTypes()
      if (res.code === 0) {
        setProductTypes(res.data)
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

  const addProductTypes = (): void => {
    let name = ''
    Modal.confirm({
      title: '添加产品大类',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品大类名称" name="name">
            <Input className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品大类名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res = await addProductType(name)
          if (res.code === 0) {
            void message.success({
              content: '添加成功'
            })
            void loadProductTypes()
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

  const addProductModels = (): void => {
    let name = ''
    let id = 0
    let service: number[] = []
    let services: User[] = []
    getDepartmentsAndStaffs(0)
      .then(res => {
        services = res.data.element_list.filter(v => v.type === 'person') as User[]
      })
      .catch(err => {
        console.error(err)
      })
    Modal.confirm({
      title: '添加产品',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品名称" name="name">
            <Input className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
          <Form.Item label="产品所属大类" name="type">
            <Select className="rounded-sm mx-2" placeholder="请选择产品所属大类" onChange={(value: number) => (id = value)}>
              {productTypes.map(v => (
                <Select.Option key={v.type_id} value={v.type_id}>
                  {v.type_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="产品所属客服" name="service">
            <Select className="rounded-sm mx-2" mode="multiple" allowClear placeholder="请选择产品所属客服" onChange={(value: number[]) => (service = value)}>
              {services.map(v => (
                <Select.Option key={v.user_id} value={v.user_id}>
                  {v.user_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res1 = await addProductModel(name, id)
          if (res1.code === 0) {
            void message.success({
              content: '添加成功'
            })
          } else {
            void message.error({
              content: res1.data
            })
          }

          const res2 = await manageCustomerService(id, service)
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

  const editProductType = (type: ProductType): void => {
    let name = ''
    Modal.confirm({
      title: '编辑产品大类信息',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品大类名称" name="name">
            <Input className="rounded-xl mx-2" autoComplete="off" placeholder="请输入产品大类名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        const res = await updateProductType(type.type_id, name)
        if (res.code === 0) {
          void message.success({
            content: '更新成功'
          })
          void loadProductTypes()
        } else {
          void message.error({
            content: res.data
          })
        }
      }
    })
  }

  const deleteProductType = (product: ProductType): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前产品大类及其产品？',
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res1 = await removeProductType(product.type_id)
          if (res1.code === 0) {
            void message.success({
              content: '删除成功'
            })
          } else {
            void message.error({
              content: res1.data
            })
          }

          const res2 = await removeCustomerService(product.type_id)
          if (res2.code === 0) {
            void message.success({
              content: '删除成功'
            })
          } else {
            void message.error({
              content: res2.data
            })
          }

          void loadProductTypes()
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  return (
    <>
      {/* 添加产品及大类按钮区域 */}
      <div className="my-5 text-right" style={{ width: '500px' }}>
        <Button className="text-blue-500" type="primary" onClick={() => addProductModels()}>
          添加产品
        </Button>
        <Button className="text-blue-500" type="primary" onClick={() => addProductTypes()}>
          添加产品大类
        </Button>
      </div>

      {/* 产品大类对应产品类型列表弹窗 */}
      <Modal destroyOnClose open={isShow} closable={true} title={`产品-${current?.type_name ?? ''}`} footer={null} okButtonProps={{ className: 'text-blue-500' }} onCancel={() => setShow(false)}>
        <ProductDetail id={current?.type_id} />
      </Modal>

      {/* 产品大类列表 */}
      <Table
        dataSource={productTypes}
        bordered
        rowKey="type_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          pageSize: DEFAULT_PAGE_SIZE
        }}
        onChange={pagination => setPageNum(pagination.current ?? 1)}
        style={{ width: '500px' }}
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
                  setShow(true)
                  updateCurrent(record)
                }}
              >
                查看
              </Button>
              <Button type="link" onClick={() => editProductType(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => deleteProductType(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default ProductManage
