/**
 * 订单附件数据结构
 */
export interface Attachment {
  /** 工单id */
  order_id: number
  /** 工单附件id */
  order_attachment_id: number
  /** 图片序号（与在解决方案界面展示的顺序有关）,从0开始 */
  serial_number: string
  /** 图片的云端存储路径 */
  storage_path: string
}

/**
 * 订单数据结构
 */
export default interface WorkOrder {
  /** 工单id */
  order_id: number
  /** 工单状态 0 1 */
  order_status: number
  /** 工单类型（0-安调，1-维修，2-巡检，3-认证，4-培训，5-软件升级） */
  order_type: 0 | 1 | 2 | 3 | 4 | 5
  /** 客户id */
  customer_id: number
  /** 产品型号id */
  model_id: number
  /** 产品型号名称 */
  model_name: string
  /** 上门预约时间 */
  appointment_time: string
  /** 地址 */
  address: string
  /** 附件列表 */
  order_attachment_list: Attachment[]
}
