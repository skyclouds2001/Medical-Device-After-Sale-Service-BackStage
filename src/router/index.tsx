import React from 'react'
import { RouteProps } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import ProductManage from '@/pages/ProductManage'
import CustomerManage from '@/pages/CustomerManage'
import CustomerServiceManage from '@/pages/CustomerServiceManage'

const routes: RouteProps[] = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/customer',
    element: <CustomerManage />
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

export default routes
