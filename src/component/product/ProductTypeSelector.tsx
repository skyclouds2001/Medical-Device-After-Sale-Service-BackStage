import React from 'react'
import { Select } from 'antd'
import useSwr from 'swr'
import { getAllProductTypes } from '@/api'

interface ProductTypeSelectorProps {
  onSelect: (value: number) => void
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = props => {
  const { data } = useSwr('/wizz/aftersale/product-model/getByTypeId', getAllProductTypes)

  return (
    <Select className="rounded-sm mx-2" placeholder="请选择产品所属大类" onSelect={props.onSelect}>
      {(data?.data ?? []).map(v => (
        <Select.Option key={v.type_id} value={v.type_id}>
          {v.type_name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default ProductTypeSelector
