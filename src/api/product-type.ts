/* eslint-disable @typescript-eslint/promise-function-async */

import qs from 'qs'
import instance from '@/network'
import type { Response, ProductType } from '@/model'

/**
 * 查询产品大类接口返回数据结构
 */
type GetProductTypeResponse = ProductType

/**
 * 查询产品大类接口
 *
 * @param {number} productTypeId 产品大类ID
 * @returns - 产品大类信息
 */
export const getProductType = (productTypeId: number): Promise<Response<GetProductTypeResponse>> =>
  instance.get('/wizz/aftersale/product-type/get', {
    params: { productTypeId },
  })

/**
 * 添加产品大类接口
 *
 * @param {string} typeName - 产品大类名称
 * @returns - NULL
 */
export const addProductType = (typeName: string): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/product-type/add', {
    type_name: typeName,
  })

/**
 * 更新产品大类接口
 *
 * @param {number} typeId - 产品大类id
 * @param {string} typeName - 产品大类名称
 * @returns - NULL
 */
export const updateProductType = (typeId: number, typeName: string): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/product-type/update', {
    type_id: typeId,
    type_name: typeName,
  })

/**
 * 删除产品大类接口
 *
 * @param {number} productTypeId - 产品大类id
 * @returns - NULL
 */
export const removeProductType = (productTypeId: number): Promise<Response<void>> =>
  instance.delete('/wizz/aftersale/product-type/delete', {
    data: qs.stringify({
      productTypeId,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

/**
 * 查询产品大类接口返回数据结构
 */
type GetAllProductTypeResponse = ProductType[]

/**
 * 查询所有产品大类接口
 *
 * @returns - 所有产品大类列表
 */
export const getAllProductTypes = (): Promise<Response<GetAllProductTypeResponse>> => instance.get('/wizz/aftersale/product-type/all')
