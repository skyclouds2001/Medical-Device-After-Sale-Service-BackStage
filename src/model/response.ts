/**
 * 请求基础数据结构
 */
interface BaseResponse<C extends number = 0, D = unknown> {
  /** 自定义的响应码 */
  code: C
  /** 笼统的提示信息 */
  msg: string
  /** 请求成功返回的数据 or 请求失败返回的可以呈现给用户的报错字符串 */
  data: D
}

type Response<D = unknown> = BaseResponse<0, D> & BaseResponse<number, string>

export default Response
