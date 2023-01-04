import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Checkbox, Modal, App } from 'antd'
import { IdcardFilled, LockFilled } from '@ant-design/icons'
import { adminLogin, resetPassword, manageCustomerService, getDepartmentsAndStaffs } from '@/apis'
import { DEFAULT_REDIRECT_PATH } from '@/config'
import Storage from '@/utils/storage'
import bgImg from '@/assets/bg-img-login.png'
import type { LoginStorage } from '@/model/login-storage'

const initManager = (): void => {
  getDepartmentsAndStaffs(0)
    .then(res => {
      console.log(res)
      if (res.code === 0) {
        const { element_list: lists } = res.data
        const ids = lists.filter(v => v.type === 'person').map(v => (v.type === 'person' ? v.user_id : v.department_id))
        manageCustomerService(-1, ids)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        throw new Error('', { cause: res })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

const LoginPage: React.FC = () => {
  const { message } = App.useApp()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  /** 用户名 */
  const [user, setUser] = useState('')
  /** 密码 */
  const [password, setPassword] = useState('')
  /** 是否记住密码 */
  const [remember, setRemember] = useState(false)
  /** 新密码 */
  const [newPassword, setNewPassword] = useState('')
  /** 新密码 */
  const [encryptedPassword, setEncryptedPassword] = useState('')

  useEffect(() => {
    const configs = Storage.getItem<LoginStorage>('login')
    if (configs != null) {
      setUser(configs.user)
      setPassword(configs.remember ? configs.password ?? '' : '')
      setRemember(configs.remember)
    }
  }, [])

  /**
   * 执行登录操作方法
   */
  const handleLogin = (): void => {
    const configs: LoginStorage = {
      user,
      password,
      remember
    }
    adminLogin(user, password)
      .then(res => {
        if (res.code === 0) {
          void message.success({
            content: '登录成功'
          })
          const { admin_uuid: uuid, has_set_general_kf: isSet, jwt_token: token } = res.data
          Storage.setItem('login', configs)
          Storage.setItem('uuid', uuid)
          if (configs.remember) configs.password = undefined
          Storage.setItem('token', token)
          if (!isSet) {
            initManager()
          }
          navigate(DEFAULT_REDIRECT_PATH)
        } else {
          void message.error({
            content: res.data
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * 执行找回密码操作方法
   */
  const handleForgetPassword = (): void => {
    resetPassword(user, encryptedPassword, newPassword)
      .then(res => {
        if (res.code === 0) {
          void message.success({
            content: '操作成功'
          })
          setIsModalOpen(false)
        } else {
          void message.error({
            content: res.data
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
        <img src={bgImg} alt="" className="object-cover object-center w-full h-full" />
      </div>

      {/* 重设密码表单 */}
      <Modal title="重设密码" okButtonProps={{ className: 'text-black' }} open={isModalOpen} onOk={handleForgetPassword} onCancel={() => setIsModalOpen(false)}>
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
          <button className="w-40 text-lg text-white border-none focus:outline-none" onClick={handleLogin} style={{ backgroundImage: 'linear-gradient(135deg, rgb(70, 100, 230), rgb(70, 100, 190) 50%, rgb(40, 50, 150))' }}>
            登录
          </button>
        </div>
        <div>
          <p className="text-right cursor-pointer select-none" onClick={() => setIsModalOpen(true)} style={{ color: 'rgb(86, 107, 217)' }}>
            忘记密码？
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
