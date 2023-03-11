/* eslint-disable @typescript-eslint/promise-function-async */

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
 *
 * @param {number} departmentId - 部门id，页面初始化时传入 id 为 0
 * @returns - 对应部门下部门或者成员列表
 */
export const getDepartmentsAndStaffs = (departmentId: number): Promise<Response<GetDepartmentsAndStaffs>> => instance.get(`/wizz/aftersale/account/kf/getDepartmentsAndStaffs/${departmentId}`)

/**
 * 查询指定产品型号接待人员接口返回数据结构
 */
interface GetSingleServerResponse {
  /** 接待人员信息列表 */
  server_info_list: Service[]
}

/**
 * 查询指定产品型号接待人员接口
 *
 * @param {number} productModelId - 产品型号id，若传入【-1】，则查询的是通用客服账号的接待人员
 * @returns - 接待人员信息
 */
export const getSingleServer = (productModelId: number): Promise<Response<GetSingleServerResponse>> => instance.get(`/wizz/aftersale/account/kf/removeKf/${productModelId}`)

/**
 * 删除指定产品型号客服以及接待人员接口
 *
 * @param {number} productModelId - 产品型号id
 * @returns - NULL
 */
export const removeSingleServer = (productModelId: number): Promise<Response<void>> => instance.delete(`/wizz/aftersale/account/kf/removeKfByModelId/${productModelId}`)

/**
 * 管理指定产品型号客服接待人员接口
 *
 * @param {number} productModelId - 产品型号id（如果传入 -1，则管理的是【通用客服】的接待人员）
 * @param {string[]} userIdList - 要被指定为接待人员的员工的 id 列表。列表中元素个数最少为 1，最多为 100
 * @returns - NULL
 */
export const manageCustomerService = (productModelId: number, userIdList: string[]): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/account/kf/setKfByModelId', {
    product_model_id: productModelId,
    user_id_list: userIdList,
  })

/**
 * 删除指定产品大类下所有客服以及接待人员接口
 *
 * @param {number} productTypeId - 产品大类id
 * @returns - NULL
 */
export const removeCustomerService = (productTypeId: number): Promise<Response<void>> => instance.delete(`/wizz/aftersale/account/kf/removeKfByTypeId/${productTypeId}`)
