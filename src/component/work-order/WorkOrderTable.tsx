import React from 'react'
import { Button, Image, Spin, Table, Typography } from 'antd'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { services } from '@/data'
import type { WorkOrder } from '@/model'

interface WorkOrderTableExpandableProps {
  order: WorkOrder
}

const WorkOrderTableExpandable: React.FC<WorkOrderTableExpandableProps> = ({ order }) => {
  return (
    <>
      <Typography.Paragraph className="text-left">
        <Typography.Text strong>预约地址：</Typography.Text>
        {order.address ?? '预约地址'}
      </Typography.Paragraph>
      <Typography.Paragraph className="text-left">
        <Typography.Text strong>工单描述：</Typography.Text>
        {order.order_description ?? '暂无'}
      </Typography.Paragraph>
      <Typography.Paragraph className="text-left">
        <Typography.Text strong>工单图片：</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph className="text-left flex justify-start items-center gap-x-5">
        {order.order_attachment_list.map(v => (
          <Image key={v.order_attachment_id} className="px-1 object-contain shadow" src={v.storage_path} alt={`${order.model_name}: ${order.servicer_name}`} width={200} height={200} placeholder={<Spin />} decoding="async" loading="lazy" />
        ))}
      </Typography.Paragraph>
    </>
  )
}

interface WorkOrderTableProps {
  workOrders: WorkOrder[]
  loading: boolean
  onRemove: (id: number) => void
  onFinish: (id: number) => void
}

const WorkOrderTable: React.FC<WorkOrderTableProps> = props => {
  return (
    <>
      <Table dataSource={props.workOrders} bordered rowKey="order_id" loading={props.loading} pagination={{ hideOnSinglePage: true }} expandable={{ expandedRowRender: record => <WorkOrderTableExpandable order={record} />, expandIcon: ({ expanded, onExpand, record }) => (expanded ? <DownOutlined onClick={e => onExpand(record, e)} /> : <RightOutlined onClick={e => onExpand(record, e)} />), columnTitle: '工单详情', columnWidth: '200px' }}>
        <Table.Column
          width="200px"
          align="center"
          title="客户信息"
          key="customer_name"
          render={(_, record: WorkOrder) => (
            <>
              {record.customer_name}
              <br />
              {record.customer_company}
            </>
          )}
        />
        <Table.Column width="200px" align="center" title="产品名称" dataIndex="model_name" key="model_name" />
        <Table.Column width="150px" align="center" title="服务类型" dataIndex="order_type" key="order_type" render={(_, record: WorkOrder) => <>{services.find(v => v.id === record.order_type)?.text}</>} />
        <Table.Column width="250px" align="center" title="创建时间" dataIndex="create_time" key="create_time" />
        <Table.Column width="150px" align="center" title="预约时间" dataIndex="appointment_time" key="appointment_time" render={(_, record: WorkOrder) => <>{record.appointment_time.split(' ')[0]}</>} />
        <Table.Column width="200px" align="center" title="负责客服" dataIndex="servicer_name" key="servicer_name" />
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
                处理完成
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default WorkOrderTable
