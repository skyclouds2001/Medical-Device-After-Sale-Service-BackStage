import React from 'react'
import { Table, Button } from 'antd'
import type { Company } from '@/model'

interface CompanyTableProps {
  companies: Company[]
  loading: boolean
  onEdit: (company: Company) => void
  onRemove: (id: number) => void
}

const CompanyTable: React.FC<CompanyTableProps> = props => {
  return (
    <>
      <Table dataSource={props.companies} bordered rowKey="company_id" loading={props.loading} pagination={{ hideOnSinglePage: true }}>
        <Table.Column width="200px" align="center" title="企业名称" dataIndex="company_name" key="company_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: Company) => (
            <>
              <Button type="link" onClick={() => props.onEdit(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => props.onRemove(record.company_id)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}

export default CompanyTable
