/**
 * 接待人员数据结构
 */
export default interface Service {
  /** 具体某个接待人员在企业微信中的头像 */
  avatar: string
  /** 接待人员名称 */
  server_name: string
  /** 接待人员的 userid */
  user_id: string
}
