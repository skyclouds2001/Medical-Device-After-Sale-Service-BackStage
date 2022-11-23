import React, { useState } from 'react'
import { Input, Checkbox } from 'antd'
import { IdcardFilled, LockFilled } from '@ant-design/icons'
import bgImg from '@/assets/bg-img-login.png'

export default function LoginPage(): JSX.Element {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleLogin = (): void => {
    console.log('login')
  }

  const handleForgetPassword = (): void => {
    console.log('forget')
  }

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-unsafe-assignment */}
      <div className="fixed inset-0 mx-auto my-0 p-0 w-screen h-screen">
        <img src={bgImg} alt="" className="object-cover object-center w-full h-full" />
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
