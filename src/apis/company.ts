import instance from '@/service'
import Network from '@/model/network'
import Company from '@/model/company'

/**
 * 查询企业信息接口返回数据结构
 */
interface GetCompanyInfoResponse {
  /** 企业信息列表 */
  admin_name: Company[]
  /** 当前查询条件下的页码总数,从1开始 */
  total_page_num: number
}

/**
 * 查询企业信息接口
 * @param isFirstQuery 是否是第一次查询
 * @param pageNum 页码，每页10条数据，页码从1开始
 */
export const getCompanyInfo = async (isFirstQuery: boolean, pageNum: number): Promise<Network<GetCompanyInfoResponse>> => {
  const res = await instance.get<Network<GetCompanyInfoResponse>>(`/wizz/aftersale/account/company/query/${isFirstQuery.toString()}/${pageNum}`)
  console.log(res)
  return res.data
}

/**
 * 添加企业信息接口
 * @param companyName 企业名称
 */
export const addCompanyInfo = async (companyName: string): Promise<Network<void>> => {
  const res = await instance.post<Network<void>>(`/wizz/aftersale/account/company/add`, {
    company_name: companyName
  })
  console.log(res)
  return res.data
}

/**
 * 修改企业信息接口
 * @param companyId 要修改的企业id
 * @param companyName 修改后的企业名称
 */
export const updateCompanyInfo = async (companyId: number, companyName: string): Promise<Network<void>> => {
  const res = await instance.put<Network<void>>('/wizz/aftersale/account/company/update', {
    company_id: companyId,
    company_name: companyName
  })
  console.log(res)
  return res.data
}

/**
 * 删除企业信息接口
 * @param companyId 企业id
 */
export const removeCompanyInfo = async (companyId: number): Promise<Network<void>> => {
  const res = await instance.delete<Network<void>>(`/wizz/aftersale/account/company/delete/${companyId}`)
  console.log(res)
  return res.data
}
