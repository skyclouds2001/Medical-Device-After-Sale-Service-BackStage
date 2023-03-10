import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Image, Menu } from 'antd'
import { UserOutlined, ProjectOutlined, CustomerServiceOutlined, FormOutlined, FileOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import logo from '@/asset/logo.png'

const items: MenuProps['items'] = [
  {
    label: '客户管理',
    key: '/customer',
    icon: <UserOutlined />,
    children: [
      {
        label: '用户管理',
        key: '/customer/user',
        icon: <UserOutlined />,
      },
      {
        label: '企业管理',
        key: '/customer/company',
        icon: <UserOutlined />,
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
    children: [
      {
        label: '产品大类管理',
        key: '/product/type',
        icon: <ProjectOutlined />,
      },
      {
        label: '产品型号管理',
        key: '/product/model',
        icon: <ProjectOutlined />,
      },
    ],
  },
  {
    label: '文件管理',
    key: '/file',
    icon: <FileOutlined />,
  },
  {
    label: '工单管理',
    key: '/order',
    icon: <FormOutlined />,
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
      <div className="h-8 m-4 overflow-hidden">
        <Image src={logo} alt="" width="8em" height="2.5em" preview={false} />
      </div>
      <Menu theme="dark" mode="inline" defaultOpenKeys={['/customer', '/product']} defaultSelectedKeys={[location.pathname]} items={items} onClick={go} />
    </>
  )
}

export default SideBar
