import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Button, Modal, App } from 'antd'
import { getCustomerInfo, addCustomerInfo, updateCustomerInfo, removeCustomerInfo } from '@/api'
import { DEFAULT_PAGE_SIZE } from '@/config'
import AddCustomer from '@/component/AddCustomer'
import EditCustomer from '@/component/EditCustomer'
import type { Customer } from '@/model'
import type { CustomAction } from '@/store'

const UserManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  /** 添加客户表单 ref 引用 */
  const addRef = useRef<ReturnType<typeof AddCustomer>>(null)
  /** 编辑客户表单 ref 引用 */
  const editRef = useRef<ReturnType<typeof EditCustomer>>(null)

  /** 客户列表 */
  const [customers, setCustomers] = useState<Customer[]>([])
  /** 客户总数 */
  const [total, setTotal] = useState(0)
  /** 标记客户列表是否处于加载状态 */
  const [isLoading, setLoading] = useState(false)
  /** 客户列表当前页数 */
  const [pageNum, setPageNum] = useState(1)

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '用户管理' })
    void loadCustomer(true, 1)
    setPageNum(1)
  }, [])

  /**
   * 加载客户信息
   * @param isFirst 是否首次加载
   * @param num 当前页数
   */
  const loadCustomer = async (isFirst: boolean, num: number): Promise<void> => {
    setLoading(true)
    try {
      const res = await getCustomerInfo(isFirst, num)
      if (res.code === 0) {
        setCustomers(res.data.customer_list)
        if (isFirst) setTotal(res.data.total_num)
      } else {
        void message.error({
          content: res.data,
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
   * 添加客户
   */
  const addCustomer = (): void => {
    Modal.confirm({
      title: '添加客户信息',
      content: <AddCustomer ref={addRef} crf={addRef} />,
      closable: true,
      okButtonProps: {
        className: 'text-blue-500',
      },
      onOk: async () => {
        const cus = (
          addRef.current as unknown as {
            getCustomer: () => { name: string; mobile: string; company: number }
          }
        ).getCustomer()
        try {
          const res = await addCustomerInfo(cus.company, cus.name, cus.mobile)
          if (res.code === 0) {
            void message.success({
              content: '更新成功',
            })
            void loadCustomer(false, pageNum)
            setTotal(total + 1)
          } else {
            void message.error({
              content: res.data,
            })
          }
        } catch (err) {
          console.error(err)
        }
      },
    })
  }

  /**
   * 更新客户信息
   * @param customer 需更新的客户信息
   */
  const editCustomer = (customer: Customer): void => {
    Modal.confirm({
      title: '修改客户信息',
      content: <EditCustomer ref={editRef} crf={editRef} customer={customer} />,
      closable: true,
      okButtonProps: {
        className: 'text-blue-500',
      },
      onOk: async () => {
        const cus = (
          editRef.current as unknown as {
            getCustomer: () => { name: string; mobile: string; company: number }
          }
        ).getCustomer()
        try {
          const res = await updateCustomerInfo(cus.company, customer.customer_id, cus.name, cus.mobile)
          if (res.code === 0) {
            void message.success({
              content: '更新成功',
            })
            void loadCustomer(false, pageNum)
          } else {
            void message.error({
              content: res.data,
            })
          }
        } catch (err) {
          console.error(err)
        }
      },
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
      onOk: async () => {
        const res = await removeCustomerInfo(customer.customer_id)
        if (res.code === 0) {
          void message.success({
            content: '删除成功',
          })
          void loadCustomer(false, pageNum)
          setTotal(total - 1)
        } else {
          void message.error({
            content: res.data,
          })
        }
      },
    })
  }

  return (
    <>
      {/* 添加客户信息按钮区域 */}
      <div className="my-5 text-right w-[50rem]">
        <Button
          className="text-blue-500"
          type="primary"
          onClick={() => {
            addCustomer()
          }}
        >
          添加客户
        </Button>
      </div>

      {/* 客户信息表格 */}
      <Table
        dataSource={customers}
        bordered
        rowKey="customer_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total,
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
          void loadCustomer(false, pagination.current ?? 1)
        }}
        className="w-[50rem]"
      >
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
              <Button
                type="link"
                onClick={() => {
                  editCustomer(record)
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  removeCustomer(record)
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

export default UserManage