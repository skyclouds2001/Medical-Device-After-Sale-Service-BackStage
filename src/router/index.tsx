import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const LoginPage = lazy(() => import('@/view/LoginPage'))

const ClientManage = lazy(() => import('@/view/ClientManage'))

const CustomerServiceManage = lazy(() => import('@/view/CustomerServiceManage'))

const ProductManage = lazy(() => import('@/view/ProductManage'))

const WorkOrderManage = lazy(() => import('@/view/WorkOrderManage'))

const FileManage = lazy(() => import('@/view/FileManage'))

const NotFound = lazy(() => import('@/view/404'))

const Routes: React.FC = () => {
  return useRoutes([
    // 登录
    {
      path: '/',
      element: <LoginPage />,
    },

    // 客户管理
    {
      path: '/client',
      element: <ClientManage />,
    },

    // 客服管理
    {
      path: '/service',
      element: <CustomerServiceManage />,
    },

    // 产品管理
    {
      path: '/product',
      element: <ProductManage />,
    },

    // 文件管理
    {
      path: '/file',
      element: <FileManage />,
    },

    // 订单管理
    {
      path: '/order',
      element: <WorkOrderManage />,
    },

    // 默认回退路由
    {
      path: '*',
      element: <NotFound />,
    },
  ])
}

export default Routes
