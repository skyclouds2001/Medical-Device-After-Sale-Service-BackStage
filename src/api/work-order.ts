import qs from 'qs'
import instance from '@/network'
import type { Response, WorkOrder } from '@/model'

/**
 * 查询工单接口
 *
 * @param {number} workOrderId 工单ID
 */
export const getWorkOrder = async (workOrderId: number): Promise<Response<WorkOrder>> => {
  const res = await instance.get<Response<WorkOrder>>('/wizz/aftersale/work-order/get', {
    params: {
      workOrderId,
    },
  })
  return res.data
}

/**
 * 查询所有工单接口
 */
export const getAllWorkOrder = async (): Promise<Response<WorkOrder[]>> => {
  const res = await instance.get<Response<WorkOrder[]>>('/wizz/aftersale/work-order/get-all')
  return res.data
}

/**
 * 添加工单接口
 *
 * @param {string} ad 地址
 * @param {string} time 上门预约时间
 * @param {number} cid 客户id
 * @param {number} mid 产品型号ID
 * @param {WorkOrder['order_attachment_list']} accessories 附件列表
 */
export const postWorkOrder = async (ad: string, time: string, cid: number, mid: number, accessories: WorkOrder['order_attachment_list']): Promise<Response<void>> => {
  const res = await instance.post<Response<void>>('/wizz/aftersale/work-order/add', {
    address: ad,
    appointment_time: time,
    customer_id: cid,
    model_id: mid,
    order_attachment_list: accessories,
  })
  return res.data
}

/**
 * 删除工单接口
 *
 * @param {number} workOrderId 工单ID
 */
export const removeWorkOrder = async (workOrderId: number): Promise<Response<void>> => {
  const res = await instance.delete<Response<void>>('/wizz/aftersale/work-order/delete', {
    data: qs.stringify({
      WorkOrderId: workOrderId,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return res.data
}
