import instance from '@/service'
import type Network from '@/model/network'
import type ProductType from '@/model/product_type'

/**
 * 查询产品大类接口返回数据结构
 */
type GetProductTypeResponse = ProductType

/**
 * 查询产品大类接口
 * @param productTypeId 产品大类ID
 */
export const getProductType = async (productTypeId: number): Promise<Network<GetProductTypeResponse>> => {
  const res = await instance.get<Network<GetProductTypeResponse>>('/wizz/aftersale/product-type/get', {
    params: { productTypeId }
  })
  return res.data
}

/**
 * 添加产品大类接口
 * @param typeName 产品大类名称
 */
export const addProductType = async (typeName: string): Promise<Network<void>> => {
  const res = await instance.post<Network<void>>('/wizz/aftersale/product-type/add', {
    type_name: typeName
  })
  return res.data
}

/**
 * 更新产品大类接口
 * @param typeId 产品大类id
 * @param typeName 产品大类名称
 */
export const updateProductType = async (typeId: number, typeName: string): Promise<Network<void>> => {
  const res = await instance.post<Network<void>>('/wizz/aftersale/product-type/update', {
    type_id: typeId,
    type_name: typeName
  })
  return res.data
}

/**
 * 删除产品大类接口
 * @param productTypeId 产品大类id
 */
export const removeProductType = async (productTypeId: number): Promise<Network<void>> => {
  const res = await instance.delete<Network<void>>('/wizz/aftersale/product-type/delete', {
    data: `productTypeId=${productTypeId}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return res.data
}

/**
 * 查询产品大类接口返回数据结构
 */
type GetAllProductTypeResponse = ProductType[]

/**
 * 查询所有产品大类接口
 */
export const getAllProductTypes = async (): Promise<Network<GetAllProductTypeResponse>> => {
  const res = await instance.get<Network<GetAllProductTypeResponse>>('/wizz/aftersale/product-type/all')
  return res.data
}
