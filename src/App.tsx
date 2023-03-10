import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider, App as Main } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Layout from '@/layout'
import Routes from '@/router'
import store from '@/store'
import '@/App.css'

dayjs.locale('zh-cn')

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Main>
        <Provider store={store}>
          <Router>
            <Layout>
              <Routes />
            </Layout>
          </Router>
        </Provider>
      </Main>
    </ConfigProvider>
  )
}

export default App
