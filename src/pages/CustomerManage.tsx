import React, { useState, useEffect } from 'react'
import { message, Table, Button } from 'antd'
import { getCustomerInfo } from '@/apis'
import type Customer from '@/model/customer'

const { Column } = Table

export default function CustomerManage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()

  const [tableData, setTableData] = useState<Customer[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    void loadCustomer(true, 1)
  }, [])

  /**
   * 加载客户信息
   * @param isFirst 是否首次加载
   * @param num 客户数量
   */
  const loadCustomer = async (isFirst: boolean, num: number): Promise<void> => {
    setLoading(true)
    try {
      const res = await getCustomerInfo(isFirst, num)
      if (res.code === 0) {
        setTableData(res.data.customer_list)
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

  /**
   * 提交编辑的客户信息
   * @param customer 客户
   */
  const editCustomerInfo = (customer: Customer): void => {
    console.log('show', customer)
  }

  /**
   * 更新客户信息
   * @param customer 客户
   */
  const removeCustomerInfo = (customer: Customer): void => {
    console.log('delete', customer)
  }

  return (
    <>
      {/* AntD Message 动态组件 */}
      {contextHolder}

      {/* 客户信息表格 */}
      <Table
        dataSource={tableData}
        bordered
        rowKey="customer_id"
        loading={isLoading}
        onChange={pagination => {
          void loadCustomer(false, pagination.current ?? 1)
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
              <Button type="link" onClick={() => editCustomerInfo(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => removeCustomerInfo(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}
