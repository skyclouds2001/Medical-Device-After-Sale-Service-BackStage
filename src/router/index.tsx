import React from 'react'
import Main from '@/pages/main'
import Products from '@/pages/products'
import CustomerServices from '@/pages/customerServices'
import Acceptances from '@/pages/acceptances'
import Clients from '@/pages/clients'

interface Route {
  path: string
  component: JSX.Element
}

const routes: Route[] = [
  {
    path: '/',
    component: <Main />
  },
  {
    path: '/products',
    component: <Products />
  },
  {
    path: '/customer-services',
    component: <CustomerServices />
  },
  {
    path: '/acceptances',
    component: <Acceptances />
  },
  {
    path: '/clients',
    component: <Clients />
  }
]

export default routes
