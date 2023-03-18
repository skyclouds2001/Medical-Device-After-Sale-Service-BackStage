import React from 'react'
import { Table, Button } from 'antd'
import type { Customer } from '@/model'

interface CustomerTableProps {
  customers: Customer[]
  loading: boolean
  onEdit: (customer: Customer) => void
  onRemove: (id: number) => void
}

const CustomerTable: React.FC<CustomerTableProps> = props => {
  return (
    <>
      <Table dataSource={props.customers} bordered rowKey="customer_id" loading={props.loading} pagination={{ hideOnSinglePage: true }}>
        <Table.Column width="200px" align="center" title="用户名称" dataIndex="customer_name" key="customer_name" />
        <Table.Column width="200px" align="center" title="企业名称" dataIndex="company_name" key="company_name" />
        <Table.Column width="200px" align="center" title="联系方式" dataIndex="mobile" key="mobile" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: Customer) => (
            <>
              <Button type="link" onClick={() => props.onEdit(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => props.onRemove(record.customer_id)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default CustomerTable
