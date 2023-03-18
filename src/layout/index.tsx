import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Breadcrumb, Layout } from 'antd'
import SideBar from '@/layout/SideBar'
import type { CustomState } from '@/store'

const LayoutContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const title = useSelector<CustomState, CustomState['title']>(state => state.title)

  if (location.pathname !== '/')
    return (
      <>
        <Layout className="min-h-screen">
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={value => {
              setCollapsed(value)
            }}
          >
            <SideBar />
          </Layout.Sider>
          <Layout className="site-layout">
            <Layout.Header className="bg-white p-0">
              <Breadcrumb className="leading-[64px] px-8 select-none">
                <Breadcrumb.Item>客服工单系统</Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
              </Breadcrumb>
            </Layout.Header>
            <Layout.Content className="mx-8 my-5">
              <div className="min-h-[600px] px-14 py-5 bg-white rounded flex justify-start items-center flex-col">{children}</div>
            </Layout.Content>
            <Layout.Footer className="text-center hidden">Wizz Studio © 2022-PRESENT &nbsp;&nbsp;&nbsp;&nbsp; Created by skyclouds2001</Layout.Footer>
          </Layout>
        </Layout>
      </>
    )
  else {
    return <>{children}</>
  }
}

export default LayoutContainer
