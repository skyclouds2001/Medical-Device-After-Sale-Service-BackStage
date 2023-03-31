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
 * @param productTypeId - 产品大类ID
 * @returns - 产品大类信息
 */
export const getProductType = (productTypeId: number): Promise<Response<GetProductTypeResponse>> =>
  instance.get('/wizz/aftersale/product-type/get', {
    params: { productTypeId },
  })

/**
 * 添加产品大类接口
 *
 * @param typeName - 产品大类名称
 * @returns - 产品大类ID
 */
export const addProductType = (typeName: string): Promise<Response<number>> =>
  instance.post('/wizz/aftersale/product-type/add', {
    type_name: typeName,
  })

/**
 * 更新产品大类接口
 *
 * @param typeId - 产品大类id
 * @param typeName - 产品大类名称
 * @returns - NULL
 */
export const updateProductType = (typeId: number, typeName: string): Promise<Response<null>> =>
  instance.post('/wizz/aftersale/product-type/update', {
    type_id: typeId,
    type_name: typeName,
  })

/**
 * 删除产品大类接口
 *
 * @param productTypeId - 产品大类id
 * @returns - NULL
 */
export const removeProductType = (productTypeId: number): Promise<Response<null>> =>
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
