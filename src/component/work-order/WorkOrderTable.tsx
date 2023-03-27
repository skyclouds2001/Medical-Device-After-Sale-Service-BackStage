import React from 'react'
import { Button, Table } from 'antd'
import { services } from '@/data'
import type { WorkOrder } from '@/model'

interface WorkOrderTableProps {
  workOrders: WorkOrder[]
  loading: boolean
  onRemove: (id: number) => void
  onFinish: (id: number) => void
}

const WorkOrderTable: React.FC<WorkOrderTableProps> = props => {
  return (
    <>
      <Table dataSource={props.workOrders} bordered rowKey="order_id" loading={props.loading} pagination={{ hideOnSinglePage: true }} expandable={{ expandedRowRender: record => <p>{record.order_description ?? '暂无更多描述'}</p> }}>
        <Table.Column width="200px" align="center" title="创建时间" dataIndex="create_time" key="create_time" />
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="200px" align="center" title="预约时间" dataIndex="appointment_time" key="appointment_time" />
        <Table.Column width="200px" align="center" title="客户用户名" dataIndex="customer_name" key="customer_name" />
        <Table.Column width="200px" align="center" title="客户公司" dataIndex="customer_company" key="customer_company" />
        <Table.Column width="200px" align="center" title="预约地址" dataIndex="address" key="address" />
        <Table.Column
          width="150px"
          align="center"
          title="类型"
          key="order_type"
          render={(_, record: WorkOrder) => (
            <>
              <span>{services.find(v => v.id === record.order_type)?.text}</span>
            </>
          )}
        />
        <Table.Column width="150px" align="center" title="工单状态" dataIndex="order_status" key="order_status" render={(_, record: WorkOrder) => <>{['处理中', '已完成'][record.order_status]}</>} />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: WorkOrder) => (
            <>
              <Button type="link" danger onClick={() => props.onRemove(record.order_id)}>
                删除
              </Button>
              <Button type="link" disabled={record.order_status === 1} onClick={() => props.onFinish(record.order_id)}>
                完成
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default WorkOrderTable
