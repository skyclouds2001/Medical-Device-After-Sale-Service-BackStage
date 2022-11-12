import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import routes from './router'
import './App.css'

export default function App(): JSX.Element {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        {routes.map(v => {
          return <Route key={v.path} path={v.path} element={v.component} />
        })}
      </Routes>
    </ConfigProvider>
  )
}
