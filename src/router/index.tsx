import React from 'react'
import { useRoutes } from 'react-router-dom'
import BasePage from '@/pages/BasePage'
import LoginPage from '@/pages/LoginPage'
import ProductManage from '@/pages/ProductManage'
import UserManage from '@/pages/UserManage'
import CustomerServiceManage from '@/pages/CustomerServiceManage'
import CompanyManage from '@/pages/CompanyManage'
import CustomerManage from '@/pages/CustomerManage'

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
          element: <CustomerManage />,
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
          element: <ProductManage />
        }
      ]
    }
  ])
}

export default Routes
