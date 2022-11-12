import React from 'react'
import LoginPage from '@/pages/LoginPage'

interface Route {
  path: string
  component: JSX.Element
}

const routes: Route[] = [
  {
    path: '/',
    component: <LoginPage />
  }
]

export default routes
