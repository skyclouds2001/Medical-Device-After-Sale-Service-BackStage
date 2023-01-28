import qs from 'qs'
import instance from '@/network'
import type { Response, ProductModel } from '@/model'

/**
 * 查询产品型号接口返回数据结构
 */
type GetProductModelResponse = ProductModel

/**
 * 查询产品型号接口
 *
 * @param {number} productModelId 产品型号id
 */
export const getProductModel = async (productModelId: number): Promise<Response<GetProductModelResponse>> => {
  const res = await instance.get<Response<GetProductModelResponse>>('/wizz/aftersale/product-model/get', {
    params: { productModelId },
  })
  return res.data
}

/**
 * 添加产品型号接口
 *
 * @param {string} modelName 产品型号名称
 * @param {number} typeId 产品型号所属大类id
 */
export const addProductModel = async (modelName: string, typeId: number): Promise<Response<void>> => {
  const res = await instance.post<Response<void>>('/wizz/aftersale/product-model/add', {
    model_name: modelName,
    type_id: typeId,
  })
  return res.data
}

/**
 * 更新产品型号接口
 *
 * @param {number} modelId 产品型号id
 * @param {string} modelName 产品型号名称
 * @param {number} typeId 产品型号所属大类id
 */
export const updateProductModel = async (modelId: number, modelName: string, typeId: number): Promise<Response<void>> => {
  const res = await instance.post<Response<void>>('/wizz/aftersale/product-model/update', {
    model_id: modelId,
    model_name: modelName,
    type_id: typeId,
  })
  return res.data
}

/**
 * 删除产品型号接口
 *
 * @param {number} productModelId 产品型号id
 */
export const removeProductModel = async (productModelId: number): Promise<Response<void>> => {
  const res = await instance.delete<Response<void>>('/wizz/aftersale/product-model/delete', {
    data: qs.stringify({
      productModelId,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return res.data
}

/**
 * 查询产品大类接口返回数据结构
 */
type GetProductModelByTypeResponse = ProductModel[]

/**
 * 查询所有产品型号接口
 *
 * @param {number} productTypeId 产品大类id
 */
export const getProductModelByType = async (productTypeId: number): Promise<Response<GetProductModelByTypeResponse>> => {
  const res = await instance.get<Response<GetProductModelByTypeResponse>>('/wizz/aftersale/product-model/getByTypeId', {
    params: {
      productTypeId,
    },
  })
  return res.data
}

/**
 * 查询产品大类接口返回数据结构
 */
type GetAllProductModelResponse = ProductModel[]

/**
 * 查询所有产品型号接口
 */
export const getAllProductModels = async (): Promise<Response<GetAllProductModelResponse>> => {
  const res = await instance.get<Response<GetAllProductModelResponse>>('/wizz/aftersale/product-model/all')
  return res.data
}
