import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, App } from 'antd'
import { getCompanyInfo, addCompanyInfo, updateCompanyInfo, removeCompanyInfo } from '@/apis'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type Company from '@/model/company'

export default function CompanyManage(): JSX.Element {
  const { message } = App.useApp()

  /** 企业列表 */
  const [company, setCompany] = useState<Company[]>([])
  /** 企业总数 */
  const [total, setTotal] = useState(0)
  /** 标记企业列表是否处于加载状态 */
  const [isLoading, setLoading] = useState(false)
  /** 企业列表当前页数 */
  const [pageNum, setPageNum] = useState(1)

  useEffect(() => {
    void loadCompany(true, 1)
  }, [])

  useEffect(() => {
    void loadCompany(false, pageNum)
  }, [pageNum])

  /**
   * 加载企业信息
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
   * 添加企业
   */
  const addCompany = (): void => {
    let name = ''
    Modal.confirm({
      title: '添加企业信息',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品大类名称" name="name">
            <Input className="rounded-xl mx-2" placeholder="请输入企业名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res = await addCompanyInfo(name)
          if (res.code === 0) {
            void message.success({
              content: '添加成功'
            })
            void loadCompany(false, pageNum)
            setTotal(total + 1)
          } else {
            void message.error({
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
   * 更新企业信息
   * @param company 需更新的企业信息
   */
  const editCompany = (company: Company): void => {
    let name = ''
    Modal.confirm({
      title: '修改企业信息',
      content: (
        <Form labelCol={{ span: 8 }} colon={false}>
          <Form.Item label="产品大类名称" name="name">
            <Input className="rounded-xl mx-2" placeholder="请输入企业名称" value={name} onChange={e => (name = e.target.value)} />
          </Form.Item>
        </Form>
      ),
      closable: true,
      okButtonProps: {
        className: 'text-blue-500'
      },
      onOk: async () => {
        try {
          const res = await updateCompanyInfo(company.company_id, name)
          if (res.code === 0) {
            void message.success({
              content: '更新成功'
            })
            void loadCompany(false, pageNum)
          } else {
            void message.error({
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
   * 移除企业信息
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
        const res = await removeCompanyInfo(company.company_id)
        if (res.code === 0) {
          void message.success({
            content: '删除成功'
          })
          void loadCompany(false, pageNum)
          setTotal(total - 1)
        } else {
          void message.error({
            content: res.data
          })
        }
      }
    })
  }

  return (
    <>
      {/* 添加企业信息按钮区域 */}
      <div className="my-5 text-right" style={{ width: '400px' }}>
        <Button className="text-blue-500" type="primary" onClick={() => addCompany()}>
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
          pageSize: DEFAULT_PAGE_SIZE
        }}
        onChange={pagination => setPageNum(pagination.current ?? 1)}
        style={{ width: '400px' }}
      >
        <Table.Column width="200px" align="center" title="企业名称" dataIndex="company_name" key="company_name" />
        <Table.Column
          width="200px"
          align="center"
          title="操作"
          key="action"
          render={(_, record: Company) => (
            <>
              <Button type="link" onClick={() => editCompany(record)}>
                编辑
              </Button>
              <Button type="link" danger onClick={() => removeCompany(record)}>
                删除
              </Button>
            </>
          )}
        />
      </Table>
    </>
  )
}
