import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { App, Button, Modal, Table } from 'antd'
import { getAllWorkOrder, removeWorkOrder } from '@/api'
import { DEFAULT_PAGE_SIZE } from '@/config'
import { CustomAction } from '@/store'
import type { WorkOrder } from '@/model'

const WorkOrderManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '工单管理' })
    void loadWorkOrder()
  }, [])

  const loadWorkOrder = async (): Promise<void> => {
    setLoading(true)
    try {
      const res = await getAllWorkOrder()
      if (res.code === 0) {
        const workOrders = res.data
        setWorkOrders(workOrders)
        setPageNum(1)
        setTotal(workOrders.length)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 250)
    }
  }

  const deleteWorkOrder = (order: WorkOrder): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除当前工单？',
      closable: true,
      okButtonProps: {
        className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent',
      },
      onOk: async () => {
        try {
          const res = await removeWorkOrder(order.order_id)
          if (res.code !== 0) {
            void message.error({
              content: res.data,
            })
          }

          void loadWorkOrder()
        } catch (err) {
          console.error(err)
        }
      },
    })
  }

  return (
    <>
      <Table
        dataSource={workOrders}
        bordered
        rowKey="order_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total,
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
        }}
        className="w-[56rem]"
      >
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="预约时间" dataIndex="appointment_time" key="appointment_time" />
        <Table.Column width="200px" align="center" title="客户ID" dataIndex="customer_id" key="customer_id" />
        <Table.Column width="200px" align="center" title="地址" dataIndex="address" key="address" />
        <Table.Column
          width="100px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: WorkOrder) => (
            <>
              <Button
                type="link"
                danger
                onClick={() => {
                  deleteWorkOrder(record)
                }}
              >
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default WorkOrderManage
