/* eslint-disable @typescript-eslint/promise-function-async */

import qs from 'qs'
import instance from '@/network'
import type { Response, ProductModel } from '@/model'

/**
 * 根据 ID 查询产品型号接口返回数据结构
 */
type GetProductModelResponse = ProductModel

/**
 * 根据 ID 查询产品型号接口
 *
 * @param {number} productModelId - 产品型号id
 * @returns - 产品型号信息
 */
export const getProductModel = (productModelId: number): Promise<Response<GetProductModelResponse>> =>
  instance.get('/wizz/aftersale/product-model/get', {
    params: {
      productModelId,
    },
  })

/**
 * 添加产品型号接口
 *
 * @param {string} modelName - 产品型号名称
 * @param {number} typeId - 产品型号所属大类id
 * @param {string} img - 产品型号展示图片的url
 * @returns - NULL
 */
export const addProductModel = (modelName: string, typeId: number, img: string): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/product-model/add', {
    model_name: modelName,
    type_id: typeId,
    pic_url: img,
  })

/**
 * 更新产品型号接口
 *
 * @param {number} modelId - 产品型号id
 * @param {string} modelName - 产品型号名称
 * @param {number} typeId - 产品型号所属大类id
 * @param {string} img - 产品型号展示图片的url
 * @returns - NULL
 */
export const updateProductModel = (modelId: number, modelName: string, typeId: number, img: string): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/product-model/update', {
    model_id: modelId,
    model_name: modelName,
    type_id: typeId,
    pic_url: img,
  })

/**
 * 删除产品型号接口
 *
 * @param {number} productModelId - 产品型号id
 * @returns - NULL
 */
export const removeProductModel = (productModelId: number): Promise<Response<void>> =>
  instance.delete('/wizz/aftersale/product-model/delete', {
    data: qs.stringify({
      productModelId,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

/**
 * 根据产品大类查询产品型号接口返回数据结构
 */
type GetProductModelByTypeResponse = ProductModel[]

/**
 * 根据产品大类查询产品型号接口
 *
 * @param {number} productTypeId - 产品大类id
 * @returns - 对应产品大类的产品型号列表
 */
export const getProductModelByType = (productTypeId: number): Promise<Response<GetProductModelByTypeResponse>> =>
  instance.get('/wizz/aftersale/product-model/getByTypeId', {
    params: {
      productTypeId,
    },
  })

/**
 * 查询所有产品型号接口返回数据结构
 */
type GetAllProductModelResponse = ProductModel[]

/**
 * 查询所有产品型号接口
 *
 * @returns - 所有产品型号列表
 */
export const getAllProductModels = (): Promise<Response<GetAllProductModelResponse>> => instance.get('/wizz/aftersale/product-model/all')
