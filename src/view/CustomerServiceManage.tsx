import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { App, Button, Image, Table } from 'antd'
import useSwr from 'swr'
import { getAllProductModels, manageCustomerService, getSingleServer } from '@/api'
import img from '@/asset/img.svg'
import ManageCustomerService from '@/component/customer-service/ManageCustomerService'
import type { ProductModel, Service } from '@/model'
import type { CustomAction } from '@/store'

interface ProductModelWithService extends ProductModel {
  services?: Service[]
  avatar: string
}

const CustomerServiceManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  const { isLoading, mutate } = useSwr('/wizz/aftersale/product-model/all', getAllProductModels, {
    onSuccess: data => {
      const products = [...(data?.data ?? [])] as ProductModelWithService[]
      void Promise.allSettled(
        products.map(v =>
          getSingleServer(v.model_id).then(res => {
            if (res.code === 0) {
              v.services = res.data.server_info_list
              v.avatar = res.data.avatar_url
            } else {
              v.services = []
              v.avatar = ''
            }
          }),
        ),
      ).finally(() => setProducts(products))
    },
  })

  /** 产品列表 */
  const [products, setProducts] = useState<ProductModelWithService[]>([])
  /** 控制编辑产品类型对应客服信息表单显示 */
  const [showEdit, setShowEdit] = useState(false)
  /** 当前产品类型信息 */
  const current = useRef<ProductModelWithService>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '客服管理' })
  }, [])

  /**
   * 编辑产品对应客服
   *
   * @param ids 客服ids
   * @param avatar 客服头像
   */
  const handleEditService = async (ids: string[], avatar: string): Promise<void> => {
    if (current.current === undefined) return
    try {
      const res = await manageCustomerService(current.current.model_id, ids, avatar)
      if (res.code === 0) {
        void message.success({
          content: '修改成功',
        })
        setShowEdit(false)
      } else {
        void message.error({
          content: res.data ?? '修改失败',
        })
      }
    } catch {
      void message.error({
        content: '修改失败',
      })
    } finally {
      void mutate()
    }
  }

  /**
   * 打开编辑客服表单
   *
   * @param product 产品信息
   */
  const openEditServiceForm = (product: ProductModelWithService): void => {
    current.current = product
    setShowEdit(true)
  }

  return (
    <>
      {/* 产品客服信息表格 */}
      <Table dataSource={products} bordered rowKey="model_id" loading={isLoading} pagination={{ hideOnSinglePage: true }}>
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="所属大类" dataIndex="type_name" key="type_name" />
        <Table.Column
          width="200px"
          align="center"
          title="产品客服"
          key="customer-service"
          render={(_, record: ProductModelWithService) => (
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
          title="客服头像"
          key="avatar"
          render={(_, record: ProductModelWithService) => (
            <>
              <Image width={100} alt={record.model_name} src={record.avatar ?? img} fallback={img} preview={false} />
            </>
          )}
        />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: ProductModelWithService) => (
            <>
              <Button type="link" onClick={() => openEditServiceForm(record)}>
                管理客服
              </Button>
            </>
          )}
        />
      </Table>

      {/* 管理客服表单 */}
      <ManageCustomerService open={showEdit} current={current.current} onSubmit={handleEditService} onCancel={() => setShowEdit(false)} />
    </>
  )
}

export default CustomerServiceManage
