import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'

const items: MenuProps['items'] = [
  {
    label: '客户管理',
    key: 'customer'
  },
  {
    label: '企业管理',
    key: 'company'
  },
  {
    label: '客服管理',
    key: 'service'
  },
  {
    label: '产品管理',
    key: 'product'
  }
]

export default function SideBar(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={[location.pathname.replaceAll('/', '')]} items={items} onClick={e => navigate(`/${e.key}`)} />
    </>
  )
}
