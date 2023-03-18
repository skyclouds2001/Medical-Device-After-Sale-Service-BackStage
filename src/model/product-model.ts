/**
 * 产品型号数据结构
 */
export default interface ProductModel {
  /** 产品型号id */
  model_id: number
  /** 产品型号名称 */
  model_name: string
  /** 产品图片链接 */
  pic_url: string
  /** 产品型号所属大类id */
  type_id: number
  /** 产品型号所属大类 */
  type_name: string
}
