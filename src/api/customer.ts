/* eslint-disable @typescript-eslint/promise-function-async */

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
 * @param {boolean} isFirstQuery - 是否是第一次查询
 * @param {number} pageNum - 页码，每页10条数据，页码从1开始
 * @returns - 分页的客户信息
 */
export const getCustomerInfo = (isFirstQuery: boolean, pageNum: number): Promise<Response<GetCustomerInfoResponse>> => instance.get(`/wizz/aftersale/account/customer/query/${isFirstQuery.toString()}/${pageNum}`)

/**
 * 添加客户信息接口
 *
 * @param {number} companyId - 企业id
 * @param {string} customerName - 客户名称
 * @param {string} mobile - 客户手机号
 * @returns - NULL
 */
export const addCustomerInfo = (companyId: number, customerName: string, mobile: string): Promise<Response<void>> =>
  instance.post(`/wizz/aftersale/account/customer/add`, {
    company_id: companyId,
    customer_name: customerName,
    mobile,
  })

/**
 * 修改客户信息接口
 *
 * @param {number} companyId - 修改后的企业id
 * @param {number} customerId - 要修改的的客户的id
 * @param {string} customerName - 修改后的客户名称
 * @param {string} mobile - 修改后的客户手机号
 * @returns - NULL
 */
export const updateCustomerInfo = (companyId: number, customerId: number, customerName: string, mobile: string): Promise<Response<void>> =>
  instance.put('/wizz/aftersale/account/customer/update', {
    company_id: companyId,
    customer_id: customerId,
    customer_name: customerName,
    mobile,
  })

/**
 * 删除客户信息接口
 *
 * @param {number} customerId - 客户id
 * @returns - NULL
 */
export const removeCustomerInfo = (customerId: number): Promise<Response<void>> => instance.delete(`/wizz/aftersale/account/customer/delete/${customerId}`)
