import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined, ProjectOutlined, CustomerServiceOutlined, SettingOutlined, FormOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const items: MenuProps['items'] = [
  {
    label: '客户管理',
    key: '/customer',
    icon: <SettingOutlined />,
    children: [
      {
        label: '用户管理',
        key: '/customer/user',
        icon: <UserOutlined />,
      },
      {
        label: '企业管理',
        key: '/customer/company',
        icon: <FormOutlined />,
      },
    ],
  },
  {
    label: '客服管理',
    key: '/service',
    icon: <CustomerServiceOutlined />,
  },
  {
    label: '产品管理',
    key: '/product',
    icon: <ProjectOutlined />,
  },
]

const SideBar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const go: Required<MenuProps>['onClick'] = e => {
    navigate(e.key)
  }

  return (
    <>
      <Menu theme="dark" mode="inline" defaultOpenKeys={['/customer']} defaultSelectedKeys={[location.pathname]} items={items} onClick={go} />
    </>
  )
}

export default SideBar
