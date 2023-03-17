import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const LoginPage = lazy(() => import('@/view/LoginPage'))

const CustomerManage = lazy(() => import('@/view/CustomerManage'))

const CompanyManage = lazy(() => import('@/view/CompanyManage'))

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
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
    },

    // 客户管理
    {
      path: '/customer/user',
      element: (
        <Suspense>
          <CustomerManage />
        </Suspense>
      ),
    },
    {
      path: '/customer/company',
      element: (
        <Suspense>
          <CompanyManage />
        </Suspense>
      ),
    },

    // 客服管理
    {
      path: '/service',
      element: (
        <Suspense>
          <CustomerServiceManage />
        </Suspense>
      ),
    },

    // 产品管理
    {
      path: '/product',
      element: (
        <Suspense>
          <ProductManage />
        </Suspense>
      ),
    },

    // 文件管理
    {
      path: '/file',
      element: (
        <Suspense>
          <FileManage />
        </Suspense>
      ),
    },

    // 订单管理
    {
      path: '/order',
      element: (
        <Suspense>
          <WorkOrderManage />
        </Suspense>
      ),
    },

    // 默认回退路由
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      ),
    },
  ])
}

export default Routes
