import React, { useState, useEffect } from 'react'
import { Select, App } from 'antd'
import { getAllProductTypes } from '@/api'
import type { ProductType } from '@/model'

interface ProductTypeSelectorProps {
  onSelect: (value: number) => void
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = props => {
  const { message } = App.useApp()
  const [productTypes, setProductTypes] = useState<ProductType[]>([])

  useEffect(() => {
    const loadProductTypes = async (): Promise<void> => {
      try {
        const res = await getAllProductTypes()
        if (res.code === 0) {
          setProductTypes(res.data)
        } else {
          void message.error({
            content: res.data,
          })
        }
      } catch (err) {
        console.error(err)
      }
    }

    void loadProductTypes()
  }, [])

  return (
    <Select className="rounded-sm mx-2" placeholder="请选择产品所属大类" onSelect={props.onSelect}>
      {productTypes.map(v => (
        <Select.Option key={v.type_id} value={v.type_id}>
          {v.type_name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default ProductTypeSelector
