import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const LoginPage = lazy(async () => await import('@/view/LoginPage'))

const CustomerManage = lazy(async () => await import('@/view/CustomerManage'))

const CompanyManage = lazy(async () => await import('@/view/CompanyManage'))

const CustomerServiceManage = lazy(async () => await import('@/view/CustomerServiceManage'))

const ProductTypeManage = lazy(async () => await import('@/view/ProductTypeManage'))

const ProductModelManage = lazy(async () => await import('@/view/ProductModelManage'))

const WorkOrderManage = lazy(async () => await import('@/view/WorkOrderManage'))

const FileManage = lazy(async () => await import('@/view/FileManage'))

const NotFound = lazy(async () => await import('@/view/404'))

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
      path: '/product/type',
      element: (
        <Suspense>
          <ProductTypeManage />
        </Suspense>
      ),
    },
    {
      path: '/product/model',
      element: (
        <Suspense>
          <ProductModelManage />
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
