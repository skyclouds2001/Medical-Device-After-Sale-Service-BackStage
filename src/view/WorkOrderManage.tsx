import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { App } from 'antd'
import useSwr from 'swr'
import { getAllWorkOrder, removeWorkOrder, finishWorkOrder } from '@/api'
import WorkOrderSearch from '@/component/work-order/WorkOrderSearch'
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
    try {
      const res = await finishWorkOrder(id)
      if (res.code === 0) {
        void message.success({
          content: '设置成功',
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
  }

  /**
   * 是否搜索模式 - 携带搜索参数
   */
  const [isSearch, setSearch] = useState<{ id?: number; type?: number } | null>(null)

  useEffect(() => {
    void mutate()
  }, [isSearch])

  /**
   * 搜索工单方法
   *
   * @param params 搜索信息
   * @param params.product_id 工单产品ID
   * @param params.work_order_type 工单类型
   */
  const handleSearch = (params?: { product_id?: number; work_order_type?: number }): void => {
    if (params !== undefined) {
      setSearch({
        id: params.product_id,
        type: params.work_order_type,
      })
    } else {
      setSearch(null)
    }
  }

  const orders =
    data?.data
      ?.filter(o => isSearch === null || ((isSearch.id === undefined || isSearch.id === o.model_id) && (isSearch.type === undefined || isSearch.type === o.order_type)))
      .sort((a, b) => (a.appointment_time > b.appointment_time ? 1 : -1))
      .sort((a, b) => (a.order_status < b.order_status ? -1 : 1)) ?? []

  return (
    <>
      {/* 工单搜索功能 */}
      <WorkOrderSearch onSearch={handleSearch} onReset={handleSearch} />

      {/* 工单表单 */}
      <WorkOrderTable workOrders={orders} loading={isLoading} onRemove={deleteWorkOrder} onFinish={closeWorkOrder} />
    </>
  )
}

export default WorkOrderManage
