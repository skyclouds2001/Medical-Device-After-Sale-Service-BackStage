import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { App, Row, Col, Button } from 'antd'
import useSwr from 'swr'
import { addCompanyInfo, addCustomerInfo, getCompanyInfo, getCustomerInfoByCompany, removeCompanyInfo, removeCustomerInfo, updateCompanyInfo, updateCustomerInfo } from '@/api'
import CompanyTable from '@/component/client/CompanyTable'
import CustomerTable from '@/component/client/CustomerTable'
import AddCompanyForm from '@/component/client/AddCompanyForm'
import AddCustomerForm from '@/component/client/AddCustomerForm'
import EditCompanyForm from '@/component/client/EditCompanyForm'
import EditCustomerForm from '@/component/client/EditCustomerForm'
import type { Company, Customer } from '@/model'
import type { CustomAction } from '@/store'

const ClientManage: React.FC = () => {
  const { message, modal } = App.useApp()
  const dispatch = useDispatch()

  const [activeCompany, setActiveCompany] = useState<number | null>(null)

  const [companyPageNum, setCompanyPageNum] = useState(1)

  const { data: companies, isLoading: isCompanyLoading, mutate: companyMutate } = useSwr(['/wizz/aftersale/account/company/query', companyPageNum], ([, page]) => getCompanyInfo(true, page), { onSuccess: data => setActiveCompany(data.data.company_list[0].company_id) })
  const { data: customers, isLoading: isCustomerLoading, mutate: customerMutate } = useSwr(['/wizz/aftersale/account/customer/query', activeCompany], ([, company]) => getCustomerInfoByCompany(company ?? -1))

  const [showAddCompany, setShowAddCompany] = useState(false)
  const [showEditCompany, setShowEditCompany] = useState(false)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [showEditCustomer, setShowEditCustomer] = useState(false)

  const currentCompany = useRef<Company>()
  const currentCustomer = useRef<Customer>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '客户管理' })
  }, [])

  const handleAddCompany = async (company: Omit<Company, 'company_id'>): Promise<void> => {
    try {
      const res = await addCompanyInfo(company.company_name)
      if (res.code === 0) {
        void message.success({
          content: '添加成功',
        })
        setShowAddCompany(false)
      } else {
        void message.error({
          content: res.data ?? '添加失败',
        })
      }
    } catch {
      void message.error({
        content: '添加失败',
      })
    } finally {
      void companyMutate()
    }
  }

  const handleAddCustomer = async (customer: Omit<Customer, 'customer_id' | 'company_name' | 'mobile' | 'company_id'> & { customer_password: string }): Promise<void> => {
    try {
      const res = await addCustomerInfo(activeCompany as number, customer.customer_name, customer.customer_password)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        setShowAddCustomer(false)
      } else {
        void message.error({
          content: res.data ?? '添加失败',
        })
      }
    } catch {
      void message.error({
        content: '添加失败',
      })
    } finally {
      void customerMutate()
    }
  }

  const handleEditCompany = async (company: Company): Promise<void> => {
    try {
      const res = await updateCompanyInfo(company.company_id, company.company_name)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        setShowEditCompany(false)
      } else {
        void message.error({
          content: res.data ?? '修改失败',
        })
      }
    } catch {
      void message.error({
        content: '修改失败',
      })
    } finally {
      void companyMutate()
    }
  }

  const handleEditCustomer = async (customer: Omit<Customer, 'company_name' | 'mobile'> & { customer_password: string }): Promise<void> => {
    try {
      const res = await updateCustomerInfo(customer.company_id, customer.customer_id, customer.customer_name, customer.customer_password)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        setShowEditCustomer(false)
      } else {
        void message.error({
          content: res.data ?? '修改失败',
        })
      }
    } catch (err) {
      void message.error({
        content: '修改失败',
      })
    } finally {
      void customerMutate()
    }
  }

  const handleRemoveCompany = (id: number): void => {
    modal.confirm({
      title: '警告',
      content: '确认移除企业信息？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      closable: true,
      onOk: async () => {
        try {
          const res = await removeCompanyInfo(id)
          if (res.code === 0) {
            void message.success({
              content: '删除成功',
            })
          } else {
            void message.error({
              content: res.data ?? '删除失败',
            })
          }
        } catch {
          void message.error({
            content: '删除失败',
          })
        } finally {
          void companyMutate()
        }
      },
    })
  }

  const handleRemoveCustomer = (id: number): void => {
    modal.confirm({
      title: '警告',
      content: '确认移除客户信息？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      closable: true,
      onOk: async () => {
        try {
          const res = await removeCustomerInfo(id)
          if (res.code === 0) {
            void message.success({
              content: '删除成功',
            })
          } else {
            void message.error({
              content: res.data ?? '删除失败',
            })
          }
        } catch {
          void message.error({
            content: '删除失败',
          })
        } finally {
          void customerMutate()
        }
      },
    })
  }

  const openEditCompanyForm = (company: Company): void => {
    setShowEditCompany(true)
    currentCompany.current = company
  }

  const openEditCustomerForm = (customer: Customer): void => {
    setShowEditCustomer(true)
    currentCustomer.current = customer
  }

  return (
    <>
      <Row className="w-full" gutter={40}>
        <Col span={10}>
          <div className="w-full py-5 text-right">
            <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={() => setShowAddCompany(true)}>
              添加企业
            </Button>
          </div>
        </Col>
        <Col span={14}>
          <div className="w-full py-5 text-right">
            <Button className="text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent" type="primary" onClick={() => setShowAddCustomer(true)}>
              添加客户
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="w-full" gutter={40}>
        <Col span={10}>
          <CompanyTable companies={companies?.data.company_list ?? []} total={companies?.data.total_num ?? 10} loading={isCompanyLoading} onEdit={openEditCompanyForm} onRemove={handleRemoveCompany} onChange={page => setCompanyPageNum(page)} current={activeCompany} onSelect={id => setActiveCompany(id === activeCompany ? null : id)} />
        </Col>
        <Col span={14}>
          <CustomerTable customers={customers?.data.customer_list.filter(v => activeCompany === null || v.company_id === activeCompany) ?? []} total={customers?.data.total_num ?? 10} loading={isCustomerLoading} onEdit={openEditCustomerForm} onRemove={handleRemoveCustomer} />
        </Col>
      </Row>

      <AddCompanyForm open={showAddCompany} onSubmit={company => handleAddCompany(company)} onCancel={() => setShowAddCompany(false)} />

      <EditCompanyForm open={showEditCompany} onSubmit={company => handleEditCompany(company)} onCancel={() => setShowEditCompany(false)} properties={currentCompany.current} />

      <AddCustomerForm open={showAddCustomer} onSubmit={customer => handleAddCustomer(customer)} onCancel={() => setShowAddCustomer(false)} />

      <EditCustomerForm open={showEditCustomer} onSubmit={customer => handleEditCustomer(customer)} onCancel={() => setShowEditCustomer(false)} properties={currentCustomer.current} />
    </>
  )
}

export default ClientManage
