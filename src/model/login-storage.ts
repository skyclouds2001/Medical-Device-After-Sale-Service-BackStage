/**
 * 登录态存储数据模型
 */
export default interface LoginStorage {
  /** 用户姓名 */
  user: string
  /** 用户密码 */
  password?: string
  /** 是否记住密码设定 */
  remember: boolean
}
