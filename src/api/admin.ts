import instance from '@/network'
import type { Response } from '@/model'

/**
 * 管理员登录接口返回数据结构
 */
interface AdminLoginResponse {
  /** 管理员名称 */
  admin_name: string
  /** 管理员uuid */
  admin_uuid: string
  /** 管理员是否设置了通用客服 */
  has_set_general_kf: boolean
  /** jwt token */
  jwt_token: string
}

/**
 * 管理员登录接口
 *
 * @param {string} admin 管理员名称
 * @param {string} password 密码
 */
export const adminLogin = async (admin: string, password: string): Promise<Response<AdminLoginResponse>> => {
  const res = await instance.post<Response<AdminLoginResponse>>('/wizz/aftersale/account/admin/login', {
    admin_name: admin,
    password,
  })
  return res.data
}

/**
 * 管理员重设密码接口
 *
 * @param {string} admin 管理员名称
 * @param {string} encrypt 密文串
 * @param {string} newPw 新密码
 */
export const resetPassword = async (admin: string, encrypt: string, newPw: string): Promise<Response<void>> => {
  const res = await instance.put<Response<void>>('/wizz/aftersale/account/admin/resetPassword', {
    admin_name: admin,
    encrypted_password: encrypt,
    new_password: newPw,
  })
  return res.data
}
