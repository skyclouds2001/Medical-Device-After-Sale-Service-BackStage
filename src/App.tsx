import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import routes from './router'
import './App.css'

export default function App(): JSX.Element {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {routes.map(v => {
            return <Route key={v.path} path={v.path} element={v.element} />
          })}
        </Routes>
      </Router>
    </ConfigProvider>
  )
}
