import React, { useState, useEffect } from 'react'
import { Input, Checkbox, message } from 'antd'
import { IdcardFilled, LockFilled } from '@ant-design/icons'
import { adminLogin } from '@/apis'
import Storage from '@/utils/storage'
import bgImg from '@/assets/bg-img-login.png'

interface LoginStorageConfig {
  user: string
  password?: string
  remember: boolean
}

export default function LoginPage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    const configs = Storage.getItem<LoginStorageConfig>('login')
    if (configs != null) {
      setUser(configs.user)
      setPassword(configs.password ?? '')
      setRemember(configs.remember)
    }
  })

  /**
   * 执行登录操作方法
   */
  const handleLogin = (): void => {
    adminLogin(user, password)
      .then(res => {
        console.log(res) // todo
        if (res.code === 0) {
          void messageApi.success({
            content: '登录成功'
          })
          Storage.setItem('login', {
            user,
            password: remember ? password : undefined,
            remember
          })
        } else {
          void messageApi.error({
            content: res.data
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  /**
   * 执行找回密码操作方法 todo
   */
  const handleForgetPassword = (): void => {
    console.log('forget')
  }

  return (
    <>
      {contextHolder}
      <div className="fixed inset-0 mx-auto my-0 p-0 w-screen h-screen">
        <img src={bgImg as string} alt="" className="object-cover object-center w-full h-full" />
      </div>
      <div
        className="fixed inset-0 p-6 mx-auto my-48 w-96 h-80 bg-white opacity-75 rounded-lg"
        style={{
          boxShadow: '5px 5px 10px rgba(255, 255, 255, 0.5)'
        }}
      >
        <div
          className="text-xl tracking-widest cursor-default select-none"
          style={{
            color: 'rgb(15, 15, 65)'
          }}
        >
          登录
        </div>
        <div className="mx-0 my-5">
          <Input placeholder="请输入用户名" prefix={<IdcardFilled />} value={user} onChange={e => setUser(e.target.value)} />
        </div>
        <div className="mx-0 my-2.5">
          <Input.Password placeholder="请输入密码" prefix={<LockFilled />} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div
          className="mx-0 my-2.5 text-left"
          style={{
            color: 'rgb(122, 121, 130)'
          }}
        >
          <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>
            记住密码
          </Checkbox>
        </div>
        <div className="mt-5 mb-2.5 mx-0">
          <button
            className="w-40 text-lg text-white border-none focus:outline-none"
            onClick={handleLogin}
            style={{
              backgroundImage: 'linear-gradient(135deg, rgb(70, 100, 230), rgb(70, 100, 190) 50%, rgb(40, 50, 150))'
            }}
          >
            登录
          </button>
        </div>
        <div>
          <p
            className="text-right cursor-pointer select-none"
            onClick={handleForgetPassword}
            style={{
              color: 'rgb(86, 107, 217)'
            }}
          >
            忘记密码？
          </p>
        </div>
      </div>
    </>
  )
}
