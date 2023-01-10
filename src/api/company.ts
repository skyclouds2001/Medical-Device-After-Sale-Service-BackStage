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
 * @param isFirstQuery 是否是第一次查询
 * @param pageNum 页码，每页10条数据，页码从1开始
 */
export const getCompanyInfo = async (isFirstQuery: boolean, pageNum: number): Promise<Response<GetCompanyInfoResponse>> => {
  const res = await instance.get<Response<GetCompanyInfoResponse>>(`/wizz/aftersale/account/company/query/${isFirstQuery.toString()}/${pageNum}`)
  return res.data
}

/**
 * 添加企业信息接口
 * @param companyName 企业名称
 */
export const addCompanyInfo = async (companyName: string): Promise<Response<void>> => {
  const res = await instance.post<Response<void>>('/wizz/aftersale/account/company/add', {
    company_name: companyName
  })
  return res.data
}

/**
 * 修改企业信息接口
 * @param companyId 要修改的企业id
 * @param companyName 修改后的企业名称
 */
export const updateCompanyInfo = async (companyId: number, companyName: string): Promise<Response<void>> => {
  const res = await instance.put<Response<void>>('/wizz/aftersale/account/company/update', {
    company_id: companyId,
    company_name: companyName
  })
  return res.data
}

/**
 * 删除企业信息接口
 * @param companyId 企业id
 */
export const removeCompanyInfo = async (companyId: number): Promise<Response<void>> => {
  const res = await instance.delete<Response<void>>(`/wizz/aftersale/account/company/delete/${companyId}`)
  return res.data
}

/**
 * 查询全部企业信息合成方法
 */
export const getAllCompanyInfo = async (): Promise<Company[]> => {
  const res = await getCompanyInfo(true, 1)
  const { total_num: num } = res.data
  const pros = []
  for (let i = 1; i <= num / 10; ++i) {
    pros.push(getCompanyInfo(false, i))
  }
  const result = await Promise.allSettled(pros)
  return result
    .filter(v => v.status === 'fulfilled')
    .map(v => (v.status === 'fulfilled' ? v.value.data.company_list : []))
    .reduce((pre, cur) => [...pre, ...cur], [])
}
