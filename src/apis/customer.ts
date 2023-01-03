import instance from '@/network'
import type Response from '@/model/response'
import type Customer from '@/model/customer'

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
 * @param isFirstQuery 是否是第一次查询
 * @param pageNum 页码，每页10条数据，页码从1开始
 */
export const getCustomerInfo = async (isFirstQuery: boolean, pageNum: number): Promise<Response<GetCustomerInfoResponse>> => {
  const res = await instance.get<Response<GetCustomerInfoResponse>>(`/wizz/aftersale/account/customer/query/${isFirstQuery.toString()}/${pageNum}`)
  return res.data
}

/**
 * 添加客户信息接口
 * @param companyId 企业id
 * @param customerName 客户名称
 * @param mobile 客户手机号
 */
export const addCustomerInfo = async (companyId: number, customerName: string, mobile: string): Promise<Response<void>> => {
  const res = await instance.post<Response<void>>(`/wizz/aftersale/account/customer/add`, {
    company_id: companyId,
    customer_name: customerName,
    mobile
  })
  return res.data
}

/**
 * 修改客户信息接口
 * @param companyId 修改后的企业id
 * @param customerId 要修改的的客户的id
 * @param customerName 修改后的客户名称
 * @param mobile 修改后的客户手机号
 */
export const updateCustomerInfo = async (companyId: number, customerId: number, customerName: string, mobile: string): Promise<Response<void>> => {
  const res = await instance.put<Response<void>>('/wizz/aftersale/account/customer/update', {
    company_id: companyId,
    customer_id: customerId,
    customer_name: customerName,
    mobile
  })
  return res.data
}

/**
 * 删除客户信息接口
 * @param customerId 客户id
 */
export const removeCustomerInfo = async (customerId: number): Promise<Response<void>> => {
  const res = await instance.delete<Response<void>>(`/wizz/aftersale/account/customer/delete/${customerId}`)
  return res.data
}
