import instance from '@/network'
import type { Response, Service, Department, User } from '@/model'

/**
 * 获取企业微信中部门和成员接口返回数据结构
 */
interface GetDepartmentsAndStaffs {
  element_list: Array<({ type: 'department' } & Department) | ({ type: 'person' } & User)>
}

/**
 * 获取企业微信中部门和成员接口
 * @param departmentId 部门id，页面初始化时传入 id 为0
 */
export const getDepartmentsAndStaffs = async (departmentId: number): Promise<Response<GetDepartmentsAndStaffs>> => {
  const res = await instance.get<Response<GetDepartmentsAndStaffs>>(`/wizz/aftersale/account/kf/getDepartmentsAndStaffs/${departmentId}`)
  return res.data
}

/**
 * 查询指定产品型号接待人员接口返回数据结构
 */
interface GetSingleServerResponse {
  /** 接待人员信息列表 */
  server_info_list: Service[]
}

/**
 * 查询指定产品型号接待人员接口
 * @param productModelId 产品型号id，若传入【-1】，则查询的是通用客服账号的接待人员
 */
export const getSingleServer = async (productModelId: number): Promise<Response<GetSingleServerResponse>> => {
  const res = await instance.get<Response<GetSingleServerResponse>>(`/wizz/aftersale/account/kf/removeKf/${productModelId}`)
  return res.data
}

/**
 * 删除指定产品型号客服以及接待人员接口
 * @param productModelId 产品型号id
 */
export const removeSingleServer = async (productModelId: number): Promise<Response<void>> => {
  const res = await instance.delete<Response<void>>(`/wizz/aftersale/account/kf/removeKfByModelId/${productModelId}`)
  return res.data
}

/**
 * 管理指定产品型号客服接待人员接口
 * @param productModelId 产品型号id（如果传入 -1，则管理的是【通用客服】的接待人员）
 * @param userIdList 要被指定为接待人员的员工的 id 列表。列表中元素个数最少为 1，最多为 100
 */
export const manageCustomerService = async (productModelId: number, userIdList: string[]): Promise<Response<void>> => {
  const res = await instance.post<Response<void>>('/wizz/aftersale/account/kf/setKfByModelId', {
    product_model_id: productModelId,
    user_id_list: userIdList,
  })
  return res.data
}

/**
 * 删除指定产品大类下所有客服以及接待人员接口
 * @param productTypeId 产品大类id
 */
export const removeCustomerService = async (productTypeId: number): Promise<Response<void>> => {
  const res = await instance.delete<Response<void>>(`/wizz/aftersale/account/kf/removeKfByTypeId/${productTypeId}`)
  return res.data
}
