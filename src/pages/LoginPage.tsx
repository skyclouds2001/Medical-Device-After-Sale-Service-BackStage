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
      <img
        src={bgImg}
        alt=""
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100vw',
          // height: '100vh',
          objectFit: 'contain',
          objectPosition: 'center',
          margin: '0 auto'
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: '25vh auto',
          padding: '25px',
          width: '400px',
          height: '300px',
          minHeight: '300px',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          borderRadius: '10px',
          boxShadow: '5px 5px 10px rgba(255, 255, 255, 0.5)'
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            color: 'rgb(15, 15, 65)'
          }}
        >
          登录
        </div>
        <div
          style={{
            margin: '10px 0'
          }}
        >
          <Input placeholder="请输入用户名" prefix={<IdcardFilled />} value={user} onChange={e => setUser(e.target.value)} />
        </div>
        <div
          style={{
            margin: '10px 0'
          }}
        >
          <Input.Password placeholder="请输入密码" prefix={<LockFilled />} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div
          style={{
            margin: '10px 0',
            textAlign: 'left',
            color: 'rgb(122, 121, 130)'
          }}
        >
          <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>
            记住密码
          </Checkbox>
        </div>
        <div
          style={{
            margin: '10px 0'
          }}
        >
          <button
            onClick={handleLogin}
            style={{
              width: '10em',
              backgroundImage: 'linear-gradient(135deg, rgb(70, 100, 230), rgb(70, 100, 190) 50%, rgb(40, 50, 150))',
              color: 'white',
              fontSize: '18px'
            }}
          >
            登录
          </button>
        </div>
        <div>
          <p
            onClick={handleForgetPassword}
            style={{
              color: 'rgb(86, 107, 217)',
              textAlign: 'right'
            }}
          >
            忘记密码？
          </p>
        </div>
      </div>
    </>
  )
}
