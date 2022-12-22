import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import routes from '@/router'
import '@/App.css'
import SideBar from '@/components/SideBar'

const { Sider, Content } = Layout

export default function App(): JSX.Element {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {routes.map(v => {
            return v.path === '/' ? (
              <Route key={v.path} path={v.path} element={v.element} />
            ) : (
              <Route
                key={v.path}
                path={v.path}
                element={
                  <Layout hasSider>
                    <Sider className="overflow-auto py-12">
                      <SideBar />
                    </Sider>
                    <Content className="bg-white mt-6 mb-0 mx-5 p-6 rounded-t-xl" style={{ minHeight: 'calc(100vh - 25px)' }}>
                      {v.element}
                    </Content>
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </Router>
    </ConfigProvider>
  )
}
