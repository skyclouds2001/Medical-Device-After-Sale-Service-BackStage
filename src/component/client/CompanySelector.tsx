import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { getCompanyInfo } from '@/api'
import { DEFAULT_PAGE_SIZE } from '@/config'
import type { Company } from '@/model'

interface CompanySelectorProps {
  onSelect: (value: number) => void
}

const CompanySelector: React.FC<CompanySelectorProps> = props => {
  /** 公司列表 */
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const loadCompanies = async (): Promise<void> => {
      try {
        let companies: Company[]
        const res = await getCompanyInfo(true, 1)
        const { total_num: num } = res.data
        companies = [...res.data.company_list]
        for (let i = 2; i < num / DEFAULT_PAGE_SIZE + 1; ++i) {
          const res = await getCompanyInfo(false, i)
          companies = [...companies, ...res.data.company_list]
        }
        setCompanies(companies)
      } catch (err) {
        console.error(err)
      }
    }

    void loadCompanies()
  }, [])

  return (
    <Select className="rounded-sm mx-2" placeholder="请选择客户所属公司" onSelect={props.onSelect}>
      {companies.map(v => (
        <Select.Option key={v.company_id} value={v.company_id}>
          {v.company_name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default CompanySelector
