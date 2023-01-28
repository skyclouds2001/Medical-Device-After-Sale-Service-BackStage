import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { getCompanyInfo } from '@/api'
import type { Company } from '@/model'

interface CompanySelectorProps {
  onSelect: (value: number) => void
}

const CompanySelector: React.FC<CompanySelectorProps> = props => {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const loadCompanies = async (): Promise<void> => {
      try {
        const res = await getCompanyInfo(true, 1)
        const { total_num: num } = res.data
        const result = await Promise.allSettled(new Array(num).fill([]).map(async (_, i) => await getCompanyInfo(false, i)))
        result.reduce<Company[]>((p, c) => [...p, ...(c.status === 'fulfilled' ? c.value.data.company_list : [])], [])
        setCompanies([])
      } catch (err) {
        console.error(err)
      }
    }

    void loadCompanies()
  }, [])

  return (
    <Select className="rounded-sm mx-2" placeholder="请选择产品所属大类" onSelect={props.onSelect}>
      {companies.map(v => (
        <Select.Option key={v.company_id} value={v.company_id}>
          {v.company_name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default CompanySelector
