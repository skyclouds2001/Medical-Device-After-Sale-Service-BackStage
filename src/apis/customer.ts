import instance from '@/service'
import Network from '@/model/network'
import Customer from '@/model/customer'

/**
 * 查询客户信息接口返回数据结构
 */
interface GetCustomerInfoResponse {
  /** 客户信息列表 */
  admin_name: Customer[]
  /** 当前查询条件下的页码总数,从1开始 */
  total_page_num: number
}

/**
 * 查询客户信息接口
 * @param isFirstQuery 是否是第一次查询
 * @param pageNum 页码，每页10条数据，页码从1开始
 */
export const getCustomerInfo = async (isFirstQuery: boolean, pageNum: number): Promise<Network<GetCustomerInfoResponse>> => {
  const res = await instance.get<Network<GetCustomerInfoResponse>>(`/wizz/aftersale/account/customer/query/${isFirstQuery.toString()}/${pageNum}`)
  console.log(res)
  return res.data
}

/**
 * 添加客户信息接口
 * @param companyId 企业id
 * @param customerName 客户名称
 * @param mobile 客户手机号
 */
export const addCustomerInfo = async (companyId: number, customerName: string, mobile: string): Promise<Network<void>> => {
  const res = await instance.post<Network<void>>(`/wizz/aftersale/account/customer/add`, {
    company_id: companyId,
    customer_name: customerName,
    mobile
  })
  console.log(res)
  return res.data
}

/**
 * 修改客户信息接口
 * @param companyId 修改后的企业id
 * @param customerId 要修改的的客户的id
 * @param customerName 修改后的客户名称
 * @param mobile 修改后的客户手机号
 */
export const updateCustomerInfo = async (companyId: number, customerId: number, customerName: string, mobile: string): Promise<Network<void>> => {
  const res = await instance.put<Network<void>>('/wizz/aftersale/account/customer/update', {
    company_id: companyId,
    customer_id: customerId,
    customer_name: customerName,
    mobile
  })
  console.log(res)
  return res.data
}

/**
 * 删除客户信息接口
 * @param customerId 客户id
 */
export const removeCustomerInfo = async (customerId: number): Promise<Network<void>> => {
  const res = await instance.delete<Network<void>>(`/wizz/aftersale/account/customer/delete/${customerId}`)
  console.log(res)
  return res.data
}
