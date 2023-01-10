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

const CustomerServiceSelector: React.FC<CustomerServiceSelectorProps> = props => {
  const [options, setOptions] = useState<Option[]>([])

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
    try {
      const options = await transform(0)
      setOptions(options)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    void initOptions()
  }, [])

  const handleOptionChange = (value: Array<Array<string | number>>): void => {
    props.onSelect?.(
      value
        .map(v => v.at(-1))
        .filter(v => v !== undefined)
        .map(v => (typeof v === 'string' ? parseInt(v) : (v as number)))
    )
  }

  return (
    <>
      <Cascader options={options} onChange={handleOptionChange} placeholder="" multiple maxTagCount="responsive" />
    </>
  )
}

export default CustomerServiceSelector
