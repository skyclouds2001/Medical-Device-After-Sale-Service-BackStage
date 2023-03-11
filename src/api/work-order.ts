/* eslint-disable @typescript-eslint/promise-function-async */

import qs from 'qs'
import instance from '@/network'
import type { Response, WorkOrder } from '@/model'

/**
 * 查询工单接口
 *
 * @param {number} workOrderId - 工单ID
 * @returns - 对应工单信息
 */
export const getWorkOrder = (workOrderId: number): Promise<Response<WorkOrder>> =>
  instance.get('/wizz/aftersale/work-order/get', {
    params: {
      workOrderId,
    },
  })

/**
 * 查询所有工单接口
 *
 * @returns - 全部工单列表
 */
export const getAllWorkOrder = (): Promise<Response<WorkOrder[]>> => instance.get('/wizz/aftersale/work-order/get-all')

/**
 * 添加工单接口
 *
 * @param {string} ad - 地址
 * @param {string} time - 上门预约时间
 * @param {number} cid - 客户id
 * @param {number} mid - 产品型号ID
 * @param {WorkOrder['order_attachment_list']} accessories - 附件列表
 * @returns - NULL
 */
export const postWorkOrder = (ad: string, time: string, cid: number, mid: number, accessories: WorkOrder['order_attachment_list']): Promise<Response<void>> =>
  instance.post('/wizz/aftersale/work-order/add', {
    address: ad,
    appointment_time: time,
    customer_id: cid,
    model_id: mid,
    order_attachment_list: accessories,
  })

/**
 * 删除工单接口
 *
 * @param {number} workOrderId - 工单ID
 * @returns - NULL
 */
export const removeWorkOrder = (workOrderId: number): Promise<Response<void>> =>
  instance.delete('/wizz/aftersale/work-order/delete', {
    data: qs.stringify({
      WorkOrderId: workOrderId,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
