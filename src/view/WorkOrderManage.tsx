import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { App } from 'antd'
import useSwr from 'swr'
import { getAllWorkOrder, removeWorkOrder } from '@/api'
import WorkOrderSearch from '@/component/work-order/WorkOrderSearch'
import WorkOrderTable from '@/component/work-order/WorkOrderTable'
import type { WorkOrder } from '@/model'
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

  /**
   * 是否搜索模式 - 携带搜索参数
   */
  const [isSearch, setSearch] = useState<{ name: string; type: number } | null>(null)

  useEffect(() => {
    void mutate()
  }, [isSearch])

  /**
   * 搜索工单方法
   *
   * @param params 搜索信息
   * @param params.product_name 工单产品名称
   * @param params.work_order_type 工单类型
   */
  const handleSearch = (params?: { product_name?: string; work_order_type: number }): void => {
    if (params !== undefined) {
      setSearch({
        name: params.product_name ?? '',
        type: params.work_order_type,
      })
    } else {
      setSearch(null)
    }
  }

  /**
   * 筛选工单方法
   *
   * @param o - 工单
   * @returns - 判别结果
   */
  const handleFilterWorkOrder = (o: WorkOrder): boolean => {
    return isSearch === null || (o.model_name.includes(isSearch.name) && o.order_type === isSearch.type)
  }

  return (
    <>
      {/* 工单搜索功能 */}
      <WorkOrderSearch onSearch={handleSearch} onReset={handleSearch} />

      {/* 工单表单 */}
      <WorkOrderTable workOrders={data?.data?.filter(handleFilterWorkOrder) ?? []} loading={isLoading} onRemove={deleteWorkOrder} />
    </>
  )
}

export default WorkOrderManage
