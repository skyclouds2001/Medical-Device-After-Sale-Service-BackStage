import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import { getDepartmentsAndStaffs } from '@/apis'

interface Option {
  value: number
  label: string
  children?: Option[]
}

interface CustomerServiceSelectorProps {
  onSelect?: (value: number[]) => void
}

export default function CustomerServiceSelector(props: CustomerServiceSelectorProps): JSX.Element {
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const transform = async (id: number): Promise<Option[]> => {
      const res = await getDepartmentsAndStaffs(id)
      const result: Option[] = []
      for (const v of res.data.element_list) {
        if (v.type === 'department') {
          const res = await transform(v.department_id)
          result.push({
            label: v.department_name,
            value: v.department_id,
            children: res
          })
        } else {
          result.push({
            label: v.user_name,
            value: v.user_id,
            children: undefined
          })
        }
      }
      return result
    }

    const initOptions = async (): Promise<void> => {
      const options = await transform(0)
      setOptions(options)
    }

    void initOptions()
  }, [])

  const onChange = (value: Array<string | number>): void => {
    props.onSelect?.(value.map(v => (typeof v === 'string' ? parseInt(v) : v)))
  }

  return (
    <>
      <Cascader options={options} onChange={onChange} placeholder="" />
    </>
  )
}
