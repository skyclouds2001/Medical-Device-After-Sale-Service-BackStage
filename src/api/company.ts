/* eslint-disable @typescript-eslint/promise-function-async */

import instance from '@/network'
import type { Response, Company } from '@/model'

/**
 * 查询企业信息接口返回数据结构
 */
interface GetCompanyInfoResponse {
  /** 企业信息列表 */
  company_list: Company[]
  /** 当前查询条件下的页码总数,从1开始 */
  total_num: number
}

/**
 * 查询企业信息接口
 *
 * @param {boolean} isFirstQuery - 是否是第一次查询
 * @param {number} pageNum - 页码，每页10条数据，页码从1开始
 * @returns - 分页的企业信息
 */
export const getCompanyInfo = (isFirstQuery: boolean, pageNum: number): Promise<Response<GetCompanyInfoResponse>> => instance.get(`/wizz/aftersale/account/company/query/${isFirstQuery.toString()}/${pageNum}`)

/**
 * 添加企业信息接口
 *
 * @param {string} companyName - 企业名称
 * @returns - NULL
 */
export const addCompanyInfo = (companyName: string): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/account/company/add', {
    company_name: companyName,
  })

/**
 * 修改企业信息接口
 *
 * @param {number} companyId - 要修改的企业id
 * @param {string} companyName - 修改后的企业名称
 * @returns - NULL
 */
export const updateCompanyInfo = (companyId: number, companyName: string): Promise<Response<void>> =>
  instance.put('/wizz/aftersale/account/company/update', {
    company_id: companyId,
    company_name: companyName,
  })

/**
 * 删除企业信息接口
 *
 * @param {number} companyId - 企业id
 * @returns - NULL
 */
export const removeCompanyInfo = (companyId: number): Promise<Response<void>> => instance.delete(`/wizz/aftersale/account/company/delete/${companyId}`)
