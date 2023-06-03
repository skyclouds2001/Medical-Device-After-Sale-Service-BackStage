import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { App } from 'antd'
import useSwr from 'swr'
import { getAllWorkOrder, removeWorkOrder, finishWorkOrder } from '@/api'
import WorkOrderSearch, { initialValues, type SearchProps } from '@/component/work-order/WorkOrderSearch'
import WorkOrderTable from '@/component/work-order/WorkOrderTable'
import type { CustomAction } from '@/store'

const WorkOrderManage: React.FC = () => {
  const { message, modal } = App.useApp()
  const dispatch = useDispatch()

  const { data, isLoading, mutate } = useSwr('/wizz/aftersale/work-order/get-all', getAllWorkOrder)

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '工单管理' })
  }, [])

  /**
   * 删除工单方法
   *
   * @param id 工单ID
   */
  const deleteWorkOrder = (id: number): void => {
    modal.confirm({
      title: '警告',
      content: '确认移除当前工单？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      closable: true,
      onOk: async () => {
        try {
          const res = await removeWorkOrder(id)
          if (res.code === 0) {
            void message.success({
              content: '删除成功',
            })
          } else {
            void message.error({
              content: res.data ?? '删除失败',
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

  const closeWorkOrder = async (id: number): Promise<void> => {
    modal.confirm({
      title: '警告',
      content: '确认设置当前工单状态为已完成？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      closable: true,
      onOk: async () => {
        try {
          const res = await finishWorkOrder(id)
          if (res.code === 0) {
            void message.success({
              content: '处理完成',
            })
          } else {
            void message.error({
              content: res.data ?? '设置失败',
            })
          }
        } catch {
          void message.error({
            content: '设置失败',
          })
        } finally {
          void mutate()
        }
      },
    })
  }

  /**
   * 是否搜索模式 - 携带搜索参数
   */
  const [search, setSearch] = useState<SearchProps>(initialValues)

  useEffect(() => {
    void mutate()
  }, [search])

  const orders =
    data?.data
      .filter(o => o.customer_name.includes(search.customer))
      .filter(o => search.product === -1 || o.model_id === search.product)
      .filter(o => search.type === -1 || o.order_type === search.type)
      .filter(o => search.status === -1 || o.order_status === search.status)
      .sort((a, b) => (search.time === 1 ? (a.create_time > b.create_time ? 1 : -1) : a.appointment_time > b.appointment_time ? 1 : -1))
      .sort((a, b) => (a.order_status > b.order_status ? 1 : -1)) ?? []

  return (
    <>
      {/* 工单搜索功能 */}
      <WorkOrderSearch onFilter={params => setSearch(params)} />

      {/* 工单表单 */}
      <WorkOrderTable workOrders={orders} loading={isLoading} onRemove={deleteWorkOrder} onFinish={closeWorkOrder} />
    </>
  )
}

export default WorkOrderManage
