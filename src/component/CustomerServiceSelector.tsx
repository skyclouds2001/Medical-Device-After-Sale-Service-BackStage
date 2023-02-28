import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import { getDepartmentsAndStaffs } from '@/api'

interface Option {
  value: number | string
  label: string
  children?: Option[]
}

interface CustomerServiceSelectorProps {
  onSelect: (value: string[]) => void
}

const CustomerServiceSelector: React.FC<CustomerServiceSelectorProps> = props => {
  /** 客服选项 */
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    void initOptions()
  }, [])

  /**
   * 加载部门下客服方法
   *
   * @param id 当前部门ID
   */
  const transform = async (id: number): Promise<Option[]> => {
    const res = await getDepartmentsAndStaffs(id)
    const result: Option[] = []
    for (const v of res.data.element_list) {
      if (v.type === 'department') {
        const res = await transform(v.department_id)
        result.push({
          label: v.department_name,
          value: v.department_id,
          children: res,
        })
      } else {
        result.push({
          label: v.user_name,
          value: v.user_id,
          children: undefined,
        })
      }
    }
    return result
  }

  /**
   * 初始化客服方法
   */
  const initOptions = async (): Promise<void> => {
    try {
      const options = await transform(0)
      setOptions(options)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * 选取客服方法
   *
   * @param value 客服信息
   */
  const handleOptionChange = (value: Array<Array<string | number>>): void => {
    props.onSelect?.(
      value
        .map(v => v.at(-1))
        .filter(v => v)
        .map(v => v as string),
    )
  }

  return (
    <>
      <Cascader options={options} onChange={handleOptionChange} placeholder="请选择客服" multiple maxTagCount="responsive" />
    </>
  )
}

export default CustomerServiceSelector
