import React, { lazy, Suspense } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

const BasePage = lazy(async () => await import('@/view/BasePage'))

const LoginPage = lazy(async () => await import('@/view/LoginPage'))

const CustomerManage = lazy(async () => await import('@/view/CustomerManage'))

const CompanyManage = lazy(async () => await import('@/view/CompanyManage'))

const CustomerServiceManage = lazy(async () => await import('@/view/CustomerServiceManage'))

const ProductTypeManage = lazy(async () => await import('@/view/ProductTypeManage'))

const ProductModelManage = lazy(async () => await import('@/view/ProductModelManage'))

const WorkOrderManage = lazy(async () => await import('@/view/WorkOrderManage'))

const NotFound = lazy(async () => await import('@/view/404'))

const Routes: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <Suspense>
          <BasePage />
        </Suspense>
      ),
      children: [
        {
          path: '/customer',
          element: <Outlet />,
          children: [
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
          ],
        },
        {
          path: '/service',
          element: (
            <Suspense>
              <CustomerServiceManage />
            </Suspense>
          ),
        },
        {
          path: '/product',
          element: <Outlet />,
          children: [
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
          ],
        },
        {
          path: '/order',
          element: (
            <Suspense>
              <WorkOrderManage />
            </Suspense>
          ),
        },
      ],
    },
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
