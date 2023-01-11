import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import BasePage from '@/view/BasePage'
import LoginPage from '@/view/LoginPage'
import ProductTypeManage from '@/view/ProductTypeManage'
import ProductModelManage from '@/view/ProductModelManage'
import UserManage from '@/view/UserManage'
import CustomerServiceManage from '@/view/CustomerServiceManage'
import CompanyManage from '@/view/CompanyManage'

const Routes: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: '/',
      element: <BasePage />,
      children: [
        {
          path: '/customer',
          element: <Outlet />,
          children: [
            {
              path: '/customer/user',
              element: <UserManage />
            },
            {
              path: '/customer/company',
              element: <CompanyManage />
            }
          ]
        },
        {
          path: '/service',
          element: <CustomerServiceManage />
        },
        {
          path: '/product',
          element: <ProductTypeManage />
        },
        {
          path: '/product/model/:id',
          element: <ProductModelManage />
        }
      ]
    }
  ])
}

export default Routes
