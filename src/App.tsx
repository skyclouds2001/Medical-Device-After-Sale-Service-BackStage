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
            return (
              <Route
                key={v.path}
                path={v.path}
                element={
                  <Layout hasSider>
                    <Sider
                      style={{
                        overflow: 'auto',
                        height: '100vh'
                      }}
                    >
                      <SideBar />
                    </Sider>
                    <Content
                      style={{
                        margin: '25px 20px 0',
                        minHeight: 'calc(100vh - 25px)',
                        backgroundColor: 'white',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px'
                      }}
                    >
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
