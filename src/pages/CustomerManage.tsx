import React, { useState, useEffect, useRef } from 'react'
import { message, Table, Button, Modal } from 'antd'
import { getCustomerInfo, updateCustomerInfo, removeCustomerInfo } from '@/apis'
import type Customer from '@/model/customer'
import EditCustomer from '@/components/EditCustomer'

const { Column } = Table

export default function CustomerManage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()

  const ref = useRef<ReturnType<typeof EditCustomer>>(null)

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

  const addCustomer = (): void => {
    console.log()
  }

  /**
   * 更新客户信息
   * @param customer 客户信息
   */
  const editCustomer = (customer: Customer): void => {
    Modal.confirm({
      title: '修改客户信息',
      content: <EditCustomer ref={ref} crf={ref} customer={customer} />,
      closable: true,
      okButtonProps: {
        className: 'text-black'
      },
      onOk: async () => {
        const cus = (
          ref.current as unknown as {
            getCustomer: () => { name: string; mobile: string; company: number }
          }
        ).getCustomer()
        try {
          const res = await updateCustomerInfo(cus.company, customer.customer_id, cus.name, cus.mobile)
          if (res.code === 0) {
            void messageApi.success({
              content: '更新成功'
            })
          } else {
            void messageApi.error({
              content: res.data
            })
          }
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  /**
   * 移除客户信息
   * @param customer 客户信息
   */
  const removeCustomer = (customer: Customer): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除客户信息？',
      okText: '删除',
      okType: 'danger',
      closable: true,
      okButtonProps: {
        className: 'text-black'
      },
      onOk: async () => {
        const res = await removeCustomerInfo(customer.customer_id)
        if (res.code === 0) {
          void messageApi.success({
            content: '删除成功'
          })
        } else {
          void messageApi.error({
            content: res.data
          })
        }
      }
    })
  }

  return (
    <>
      {/* AntD Message 动态组件 */}
      {contextHolder}

      {/* 添加客户信息按钮区域 */}
      <div>
        <Button onClick={() => addCustomer()}>添加客户</Button>
      </div>

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
        <Column align="center" title="用户名称" dataIndex="customer_name" key="customer_name" />
        <Column align="center" title="企业名称" dataIndex="company_id" key="company_id" />
        <Column align="center" title="联系方式" dataIndex="mobile" key="mobile" />
        <Column
          align="center"
          title="操作"
          key="action"
          render={(_, record: Customer) => (
            <>
              <Button type="link" onClick={() => editCustomer(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => removeCustomer(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}
