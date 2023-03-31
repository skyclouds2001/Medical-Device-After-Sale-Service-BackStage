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
 * @param admin - 管理员名称
 * @param password - 密码
 * @returns - 登录成功用户数据
 */
export const adminLogin = (admin: string, password: string): Promise<Response<AdminLoginResponse>> =>
  instance.post('/wizz/aftersale/account/admin/login', {
    admin_name: admin,
    password,
  })

/**
 * 管理员重设密码接口
 *
 * @param admin - 管理员名称
 * @param encrypt - 密文串
 * @param newPw - 新密码
 * @returns - NULL
 */
export const resetPassword = (admin: string, encrypt: string, newPw: string): Promise<Response<null>> =>
  instance.put('/wizz/aftersale/account/admin/resetPassword', {
    admin_name: admin,
    encrypted_password: encrypt,
    new_password: newPw,
  })
