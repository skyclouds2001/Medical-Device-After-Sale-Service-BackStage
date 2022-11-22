/**
 * 客户数据结构
 */
export default interface Customer {
  /** 所属企业id */
  company_id: number
  /** 客户id */
  customer_id: number
  /** 客户名称 */
  customer_name: string
  /** 客户手机号 */
  mobile: string
}
