import React, { useState, useEffect } from 'react'
import { message, Table } from 'antd'
import { getCustomerInfo } from '@/apis'
import type Customer from '@/model/customer'

const { Column } = Table

export default function CustomerManage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()

  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [totalPageNum, setTotalPageNum] = useState(1)
  const [tableData, setTableData] = useState<Customer[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    void loadCustomer(true, 1)
  }, [])

  const loadCustomer = async (isFirst: boolean, num: number): Promise<void> => {
    setLoading(true)
    try {
      const res = await getCustomerInfo(isFirst, num)
      if (res.code === 0) {
        setTableData(res.data.customer_list)
        if (isFirst) setTotalPageNum(res.data.total_page_num)
      } else {
        void messageApi.error({
          content: res.data
        })
      }
    } catch (err) {
      console.error(err)
    }
    setTimeout(() => {
      setLoading(false)
    }, 250)
  }

  return (
    <>
      {/* AntD Message 动态组件 */}
      {contextHolder}

      <Table
        dataSource={tableData}
        bordered
        rowKey="customer_id"
        loading={isLoading}
        onChange={pagination => {
          void loadCustomer(false, pagination.current ?? 0)
        }}
      >
        <Column title="用户名称" dataIndex="customer_name" key="customer_name" />
        <Column title="企业名称" dataIndex="company_id" key="company_id" />
        <Column title="联系方式" dataIndex="mobile" key="mobile" />
        <Column
          title="操作"
          key="action"
          render={(_, record: Customer) => (
            <>
              <div>ccc</div>
            </>
          )}
        />
      </Table>
    </>
  )
}
