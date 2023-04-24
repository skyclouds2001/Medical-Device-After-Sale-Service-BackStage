import React, { useState, useEffect } from 'react'
import { Button, Cascader, Divider } from 'antd'
import { getDepartmentsAndStaffs } from '@/api'

interface Option {
  value: number | string
  label: string
  children?: Option[]
}

interface CustomerServiceSelectorProps {
  onSelect: (value: Array<string | number>) => void
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

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Array<Array<string | number>>>([])

  const handleOptionChange = (value: Array<Array<string | number>>): void => {
    setValue(value)
    props.onSelect(value.map(v => v[v.length - 1]))
  }

  const dropdownRender = (menus: React.ReactElement): React.ReactElement => {
    const confirm = (): void => {
      setOpen(false)
    }
    const cancel = (): void => {
      setValue([])
      setOpen(false)
      props.onSelect([])
    }

    return (
      <div>
        {menus}
        <Divider className="m-0" />
        <div className="p-2">
          <Button type="link" onClick={confirm}>
            确认
          </Button>
          <Button type="link" onClick={cancel}>
            取消
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Cascader open={open} value={value} options={options} showCheckedStrategy={Cascader.SHOW_CHILD} placeholder="请选择客服" multiple maxTagCount="responsive" notFoundContent="加载中..." dropdownRender={dropdownRender} onChange={handleOptionChange} onDropdownVisibleChange={value => setOpen(value)} />
    </>
  )
}

export default CustomerServiceSelector
