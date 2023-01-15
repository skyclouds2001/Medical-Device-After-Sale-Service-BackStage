import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider, App } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Routes from '@/router'
import store from '@/store'
import '@/App.css'

dayjs.locale('zh-cn')

const Main: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <App>
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      </App>
    </ConfigProvider>
  )
}

export default Main
