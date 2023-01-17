import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Button, Modal, App } from 'antd'
import { getCompanyInfo, addCompanyInfo, updateCompanyInfo, removeCompanyInfo } from '@/api'
import { DEFAULT_PAGE_SIZE } from '@/config'
import AddCompany from '@/component/AddCompany'
import EditCompany from '@/component/EditCompany'
import type { Company } from '@/model'
import type { CustomAction } from '@/store'

const CompanyManage: React.FC = () => {
  const { message } = App.useApp()
  const dispatch = useDispatch()

  /** 企业列表 */
  const [company, setCompany] = useState<Company[]>([])
  /** 企业总数 */
  const [total, setTotal] = useState(0)
  /** 标记企业列表是否处于加载状态 */
  const [isLoading, setLoading] = useState(false)
  /** 企业列表当前页数 */
  const [pageNum, setPageNum] = useState(1)

  const [showAddCompany, setShowAddCompany] = useState(false)
  const [showEditCompany, setShowEditCompany] = useState(false)
  const current = useRef<Company>()

  useEffect(() => {
    dispatch<CustomAction>({ type: 'title/update', title: '企业管理' })
    void loadCompany(true, 1)
  }, [])

  /**
   * 加载企业信息
   *
   * @param isFirst 是否首次加载
   * @param num 当前页数
   */
  const loadCompany = async (isFirst: boolean, num: number): Promise<void> => {
    setLoading(true)
    try {
      const res = await getCompanyInfo(isFirst, num)
      if (res.code === 0) {
        setCompany(res.data.company_list)
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
   * 添加企业
   *
   * @param params
   */
  const addCompany = async (params: Omit<Company, 'company_id'>): Promise<void> => {
    try {
      const res = await addCompanyInfo(params.company_name)
      if (res.code === 0) {
        void message.success({
          content: '添加成功',
        })
        void loadCompany(false, pageNum)
        setTotal(total + 1)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 更新企业信息
   *
   * @param params 需更新的企业信息
   */
  const editCompany = async (params: Company): Promise<void> => {
    try {
      const res = await updateCompanyInfo(params.company_id, params.company_name)
      if (res.code === 0) {
        void message.success({
          content: '更新成功',
        })
        void loadCompany(false, pageNum)
      } else {
        void message.error({
          content: res.data,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 移除企业信息
   *
   * @param company 企业信息
   */
  const removeCompany = (company: Company): void => {
    Modal.confirm({
      title: '警告',
      content: '确认移除企业信息？',
      okText: '删除',
      okType: 'danger',
      closable: true,
      onOk: async () => {
        try {
          const res = await removeCompanyInfo(company.company_id)
          if (res.code === 0) {
            void message.success({
              content: '删除成功',
            })
            void loadCompany(false, pageNum)
            setTotal(total - 1)
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

  return (
    <>
      {/* 添加企业信息按钮区域 */}
      <div className="my-5 text-right w-[25rem]">
        <Button
          onClick={() => {
            setShowAddCompany(true)
          }}
        >
          添加企业
        </Button>
      </div>

      {/* 企业信息表格 */}
      <Table
        dataSource={company}
        bordered
        rowKey="company_id"
        loading={isLoading}
        pagination={{
          current: pageNum,
          total,
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        onChange={pagination => {
          setPageNum(pagination.current ?? 1)
          void loadCompany(false, pageNum)
        }}
        className="w-[25rem]"
      >
        <Table.Column width="200px" align="center" title="企业名称" dataIndex="company_name" key="company_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: Company) => (
            <>
              <Button
                type="link"
                onClick={() => {
                  setShowEditCompany(true)
                  current.current = record
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  removeCompany(record)
                }}
              >
                删除
              </Button>
            </>
          )}
        />
      </Table>

      <AddCompany
        open={showAddCompany}
        onSubmit={props => {
          void addCompany(props)
        }}
        onCancel={() => {
          setShowAddCompany(false)
        }}
      />

      <EditCompany
        open={showEditCompany}
        onSubmit={props => {
          void editCompany(props)
        }}
        onCancel={() => {
          setShowEditCompany(false)
        }}
        properties={current.current as Company}
      />
    </>
  )
}

export default CompanyManage
