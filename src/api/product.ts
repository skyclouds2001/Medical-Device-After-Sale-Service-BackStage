import qs from 'qs'
import instance from '@/network'
import type { Response, Product } from '@/model'

/**
 * 根据 ID 查询产品接口返回数据结构
 */
type GetProductResponse = Product

/**
 * 根据 ID 查询产品接口
 *
 * @param id - 产品id
 * @returns - 产品信息
 */
export const getProduct = (id: number): Promise<Response<GetProductResponse>> =>
  instance.get('/wizz/aftersale/product-model/get', {
    params: {
      productModelId: id,
    },
  })

/**
 * 添加产品接口
 *
 * @param name - 产品名称
 * @param img - 产品图片 URL
 * @returns - 产品 ID
 */
export const addProduct = (name: string, img: string): Promise<Response<number>> =>
  instance.post('/wizz/aftersale/product-model/add', {
    model_name: name,
    pic_url: img,
  })

/**
 * 更新产品接口
 *
 * @param id - 产品 ID
 * @param name - 产品名称
 * @param img - 产品图片 URL
 * @returns - NULL
 */
export const updateProduct = (id: number, name: string, img: string): Promise<Response<null>> =>
  instance.post('/wizz/aftersale/product-model/update', {
    model_id: id,
    model_name: name,
    pic_url: img,
  })

/**
 * 删除产品接口
 *
 * @param id - 产品 ID
 * @returns - NULL
 */
export const removeProduct = (id: number): Promise<Response<null>> =>
  instance.delete('/wizz/aftersale/product-model/delete', {
    data: qs.stringify({
      productModelId: id,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

/**
 * 查询所有产品接口返回数据结构
 */
type GetAllProductsResponse = Product[]

/**
 * 查询所有产品接口
 *
 * @returns - 所有产品列表
 */
export const getAllProducts = (): Promise<Response<GetAllProductsResponse>> => instance.get('/wizz/aftersale/product-model/all')
