import React from 'react'
import { useRoutes } from 'react-router-dom'
import BasePage from '@/views/BasePage'
import LoginPage from '@/views/LoginPage'
import ProductManage from '@/views/ProductManage'
import ProductModelManage from '@/views/ProductModelManage'
import UserManage from '@/views/UserManage'
import CustomerServiceManage from '@/views/CustomerServiceManage'
import CompanyManage from '@/views/CompanyManage'
import CustomerManage from '@/views/CustomerManage'

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
