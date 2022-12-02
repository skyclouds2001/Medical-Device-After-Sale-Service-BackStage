import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { DEFAULT_REDIRECT_PATH } from '@/config'

const items: MenuProps['items'] = [
  {
    label: '客户管理',
    key: 'customer'
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

  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={[DEFAULT_REDIRECT_PATH.replaceAll('/', '')]} items={items} onClick={e => navigate(`/${e.key}`)} />
    </>
  )
}
