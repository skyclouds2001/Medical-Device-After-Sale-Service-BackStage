import instance from '@/network'
import type Network from '@/model/network'
import type ProductModel from '@/model/product_model'

/**
 * 查询产品型号接口返回数据结构
 */
type GetProductModelResponse = ProductModel

/**
 * 查询产品型号接口
 * @param productModelId 产品型号id
 */
export const getProductModel = async (productModelId: number): Promise<Network<GetProductModelResponse>> => {
  const res = await instance.get<Network<GetProductModelResponse>>('/wizz/aftersale/product-model/get', {
    params: { productModelId }
  })
  return res.data
}

/**
 * 添加产品型号接口
 * @param modelName 产品型号名称
 * @param typeId 产品型号所属大类id
 */
export const addProductModel = async (modelName: string, typeId: number): Promise<Network<void>> => {
  const res = await instance.post<Network<void>>('/wizz/aftersale/product-model/add', {
    model_name: modelName,
    type_id: typeId
  })
  return res.data
}

/**
 * 更新产品型号接口
 * @param modelId 产品型号id
 * @param modelName 产品型号名称
 * @param typeId 产品型号id
 */
export const updateProductModel = async (modelId: number, modelName: string, typeId: number): Promise<Network<void>> => {
  const res = await instance.post<Network<void>>('/wizz/aftersale/product-model/update', {
    model_id: modelId,
    model_name: modelName,
    type_id: typeId
  })
  return res.data
}

/**
 * 删除产品型号接口
 * @param productModelId
 */
export const removeProductModel = async (productModelId: number): Promise<Network<void>> => {
  const res = await instance.delete<Network<void>>('/wizz/aftersale/product-model/delete', {
    data: `productModelId=${productModelId}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return res.data
}

/**
 * 查询产品大类接口返回数据结构
 */
type GetProductModelByTypeResponse = ProductModel[]

/**
 * 查询所有产品型号接口
 */
export const getProductModelByType = async (productTypeId: number): Promise<Network<GetProductModelByTypeResponse>> => {
  const res = await instance.get<Network<GetProductModelByTypeResponse>>('/wizz/aftersale/product-model/getByTypeId', {
    params: {
      productTypeId
    }
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
export const getAllProductModels = async (): Promise<Network<GetAllProductModelResponse>> => {
  const res = await instance.get<Network<GetAllProductModelResponse>>('/wizz/aftersale/product-model/all')
  return res.data
}
