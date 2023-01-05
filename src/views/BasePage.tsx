import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Breadcrumb, Layout } from 'antd'
import SideBar from '@/components/SideBar'
import type { CustomState } from '@/store'

const BasePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const title = useSelector<CustomState, CustomState['title']>(state => state.title)

  return (
    <Layout className="min-h-screen">
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="h-8 m-4 bg-[#FFFFFF33]" />
        <SideBar />
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header style={{ padding: 0, backgroundColor: 'white' }}>
          <Breadcrumb className="leading-[64px] px-4">
            <Breadcrumb.Item>客服工单系统</Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className="m-4">
          <div className="min-h-[400px] p-6 bg-white">
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer className="text-center">Wizz Studio © 2022-PRESENT &nbsp;&nbsp;&nbsp;&nbsp; Created by skyclouds2001</Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default BasePage
