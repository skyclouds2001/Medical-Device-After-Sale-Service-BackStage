import React from 'react'
import Main from '@/pages/main'

interface Route {
  path: string
  component: JSX.Element
}

const routes: Route[] = [
  {
    path: '/',
    component: <Main />
  }
]

export default routes
