import React, { lazy, Suspense } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

const BasePage = lazy(async () => await import('@/view/BasePage'))

const LoginPage = lazy(async () => await import('@/view/LoginPage'))

const UserManage = lazy(async () => await import('@/view/UserManage'))

const CompanyManage = lazy(async () => await import('@/view/CompanyManage'))

const CustomerServiceManage = lazy(async () => await import('@/view/CustomerServiceManage'))

const ProductTypeManage = lazy(async () => await import('@/view/ProductTypeManage'))

const ProductModelManage = lazy(async () => await import('@/view/ProductModelManage'))

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
                  <UserManage />
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
          element: (
            <Suspense>
              <ProductTypeManage />
            </Suspense>
          ),
        },
        {
          path: '/product/model/:id',
          element: (
            <Suspense>
              <ProductModelManage />
            </Suspense>
          ),
        },
      ],
    },
  ])
}

export default Routes
