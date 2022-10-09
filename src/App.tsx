import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import routes from './router'
import './App.css'

const { Header, Content, Footer } = Layout

export default function App(): JSX.Element {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header>header</Header>
        <Content>
          <Routes>
            {routes.map(v => {
              return <Route key={v.path} path={v.path} element={v.component} />
            })}
          </Routes>
        </Content>
        <Footer>footer</Footer>
      </Layout>
    </ConfigProvider>
  )
}
