/**
 * 工单类型数据结构
 */
export interface Service {
  id: number
  text: string
}

/**
 * 工单类型
 */
export const services: Service[] = [
  {
    id: 0,
    text: '安调',
  },
  {
    id: 1,
    text: '维修',
  },
  {
    id: 2,
    text: '询检',
  },
  {
    id: 3,
    text: '认证',
  },
  {
    id: 4,
    text: '培训',
  },
  {
    id: 5,
    text: '软件升级',
  },
]
