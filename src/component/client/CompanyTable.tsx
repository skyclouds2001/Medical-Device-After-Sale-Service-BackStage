import React from 'react'
import { Table, Button } from 'antd'
import type { Company } from '@/model'

interface CompanyTableProps {
  companies: Company[]
  total: number
  loading: boolean
  current: number | null
  onSelect: (id: number) => void
  onChange: (current: number) => void
  onEdit: (company: Company) => void
  onRemove: (id: number) => void
}

const CompanyTable: React.FC<CompanyTableProps> = props => {
  const handleEdit = (e: React.MouseEvent, company: Company): void => {
    e.stopPropagation()
    props.onEdit(company)
  }

  const handleRemove = (e: React.MouseEvent, company: Company): void => {
    e.stopPropagation()
    props.onRemove(company.company_id)
  }

  return (
    <>
      <Table dataSource={props.companies} bordered rowKey="company_id" loading={props.loading} pagination={{ hideOnSinglePage: true, total: props.total }} onChange={({ current }) => props.onChange(current ?? 1)} rowSelection={{ selectedRowKeys: props.current !== null ? [props.current] : [], type: 'radio', onSelect: company => props.onSelect(company.company_id) }} onRow={record => ({ onClick: () => props.onSelect(record.company_id) })}>
        <Table.Column width="200px" align="center" title="企业名称" dataIndex="company_name" key="company_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: Company) => (
            <>
              <Button type="link" onClick={e => handleEdit(e, record)}>
                修改
              </Button>
              <Button type="link" danger onClick={e => handleRemove(e, record)}>
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
