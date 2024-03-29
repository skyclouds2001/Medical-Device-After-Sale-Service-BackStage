import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Checkbox, Modal, App, Image, Button } from 'antd'
import { IdcardFilled, LockFilled } from '@ant-design/icons'
import { adminLogin, resetPassword, manageCustomerService, getDepartmentsAndStaffs } from '@/api'
import { DEFAULT_REDIRECT_PATH, SESSION_EXPIRE, LOGIN_PAGE_BACKGROUND_IMG as IMG } from '@/config'
import { getStorage, setStorage } from '@/util'
import type { LoginStorage } from '@/model'

const LoginPage: React.FC = () => {
  const { message } = App.useApp()
  const navigate = useNavigate()

  /** 标记重设密码表单是否显示 */
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLogining, setLogining] = useState(false)

  /** 用户名 */
  const [user, setUser] = useState('')
  /** 密码 */
  const [password, setPassword] = useState('')
  /** 是否记住密码 */
  const [remember, setRemember] = useState(false)
  /** 新密码 */
  const [newPassword, setNewPassword] = useState('')
  /** 重设密文串 */
  const [encryptedPassword, setEncryptedPassword] = useState('')

  useEffect(() => {
    const configs = getStorage<LoginStorage>('login')
    if (configs != null) {
      setUser(configs.user)
      setPassword(configs.remember ? configs.password ?? '' : '')
      setRemember(configs.remember)
    }
  }, [])

  /** 初始化管理员信息方法 */
  const initManager = async (): Promise<void> => {
    try {
      const res1 = await getDepartmentsAndStaffs(0)

      if (res1.code !== 0) {
        void message.error({
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          content: res1.data.toString(),
        })
      }

      const ids = res1.data.element_list.filter(v => v.type === 'person').map(v => (v.type === 'person' ? v.user_id : v.department_id.toString()))

      const res2 = await manageCustomerService(-1, ids, 'null')

      if (res2.code !== 0) {
        void message.error({
          content: res2.data ?? '设置通用客服失败',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 登录方法
   */
  const handleLogin = (): void => {
    const configs: LoginStorage = {
      user,
      password,
      remember,
    }
    setLogining(true)

    void adminLogin(user, password)
      .then(res => {
        if (res.code === 0) {
          void message.success({
            content: '登录成功',
          })
          const { admin_uuid: uuid, has_set_general_kf: isSet, jwt_token: token } = res.data
          if (!configs.remember) configs.password = undefined
          setStorage<string>('token', token, SESSION_EXPIRE)
          setStorage<string>('uuid', uuid, SESSION_EXPIRE)
          setStorage<LoginStorage>('login', configs, Number.MAX_VALUE)
          if (!isSet) void initManager()
          navigate(DEFAULT_REDIRECT_PATH)
        } else {
          void message.error({
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            content: res.data.toString(),
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLogining(false)
      })
  }

  /**
   * 找回密码方法
   */
  const handleForgetPassword = (): void => {
    resetPassword(user, encryptedPassword, newPassword)
      .then(res => {
        if (res.code === 0) {
          void message.success({
            content: '操作成功',
          })
          setModalOpen(false)
        } else {
          void message.error({
            content: res.data,
          })
          setEncryptedPassword('')
          setNewPassword('')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      {/* 背景图片 */}
      <div className="fixed inset-0 mx-auto my-0 p-0 w-screen h-screen">
        <Image src={IMG} alt="login-background" width="100vw" height="100vh" preview={false} decoding="sync" loading="eager" />
      </div>

      {/* 重设密码表单 */}
      <Modal title="重设密码" open={isModalOpen} okText="确认" cancelText="取消" okButtonProps={{ className: 'text-blue-500 border-blue-500 hover:text-white hover:border-transparent active:text-white active:border-transparent' }} onOk={handleForgetPassword} onCancel={() => setModalOpen(false)}>
        <Input className="rounded my-2.5" placeholder="请输入用户名" value={user} onChange={e => setUser(e.target.value)} />
        <Input className="rounded my-2.5" placeholder="请输入重设密文串" value={encryptedPassword} onChange={e => setEncryptedPassword(e.target.value)} />
        <Input className="rounded my-2.5" placeholder="请输入新密码" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      </Modal>

      {/* 登录表单 */}
      <div className="fixed inset-0 p-6 mx-auto my-48 w-96 h-80 bg-white opacity-75 rounded-lg" style={{ boxShadow: '5px 5px 10px rgba(255, 255, 255, 0.5)' }}>
        <div className="text-xl tracking-widest cursor-default select-none" style={{ color: 'rgb(15, 15, 65)' }}>
          登录
        </div>
        <div className="mx-0 my-5">
          <Input placeholder="请输入用户名" prefix={<IdcardFilled />} value={user} onChange={e => setUser(e.target.value)} />
        </div>
        <div className="mx-0 my-2.5">
          <Input.Password placeholder="请输入密码" prefix={<LockFilled />} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mx-0 my-2.5 text-left" style={{ color: 'rgb(122, 121, 130)' }}>
          <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>
            记住密码
          </Checkbox>
        </div>
        <div className="mt-5 mb-2.5 mx-0">
          <Button loading={isLogining} disabled={isLogining} className="w-40 text-white rounded-sm saturate-100 active:saturate-[.9]" onClick={handleLogin} style={{ backgroundImage: 'linear-gradient(135deg, rgb(70, 100, 230), rgb(70, 100, 190) 50%, rgb(40, 50, 150))' }}>
            登录
          </Button>
        </div>
        <div>
          <p className="text-right cursor-pointer select-none" onClick={() => setModalOpen(true)} style={{ color: 'rgb(86, 107, 217)' }}>
            忘记密码？
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
