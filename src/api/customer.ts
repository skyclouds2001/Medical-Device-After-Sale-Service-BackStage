import instance from '@/network'
import type { Response, Customer } from '@/model'

/**
 * 查询客户信息接口返回数据结构
 */
interface GetCustomerInfoResponse {
  /** 客户信息列表 */
  customer_list: Customer[]
  /** 客户总数 */
  total_num: number
}

/**
 * 查询客户信息接口
 *
 * @param isFirstQuery - 是否是第一次查询
 * @param pageNum - 页码，每页10条数据，页码从1开始
 * @returns - 分页的客户信息
 */
export const getCustomerInfo = (isFirstQuery: boolean, pageNum: number): Promise<Response<GetCustomerInfoResponse>> => instance.get(`/wizz/aftersale/account/customer/query/${isFirstQuery.toString()}/${pageNum}`)

/**
 * 添加客户信息接口
 *
 * @param company - 企业id
 * @param name - 客户账号名称
 * @param password - 客户账号密码
 * @returns - NULL
 */
export const addCustomerInfo = (company: number, name: string, password: string): Promise<Response<null>> =>
  instance.post(`/wizz/aftersale/account/customer/add`, {
    company_id: company,
    customer_name: name,
    customer_password: password,
  })

/**
 * 修改客户信息接口
 *
 * @param companyId - 修改后的企业id
 * @param customerId - 要修改的的客户的id
 * @param customerName - 修改后的客户名称
 * @param customerPwd - 修改后的客户密码
 * @returns - NULL
 */
export const updateCustomerInfo = (companyId: number, customerId: number, customerName: string, customerPwd: string): Promise<Response<null>> =>
  instance.put('/wizz/aftersale/account/customer/update', {
    company_id: companyId,
    customer_id: customerId,
    customer_name: customerName,
    customer_password: customerPwd,
  })

/**
 * 删除客户信息接口
 *
 * @param customerId - 客户id
 * @returns - NULL
 */
export const removeCustomerInfo = (customerId: number): Promise<Response<null>> => instance.delete(`/wizz/aftersale/account/customer/delete/${customerId}`)

/**
 * 根据企业ID查询客户信息接口
 *
 * @param companyId - 企业ID
 * @returns - 客户信息
 */
export const getCustomerInfoByCompany = (companyId: number): Promise<Response<GetCustomerInfoResponse>> => instance.get(`/wizz/aftersale/account/customer/queryByCompany/${companyId}`)
