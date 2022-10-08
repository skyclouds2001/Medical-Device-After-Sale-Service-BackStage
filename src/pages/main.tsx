import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCounter } from '@/store/modules/main'
import { RootStore } from '@/store'
import { PlusOutlined } from '@ant-design/icons'

export default function Main(): JSX.Element {
  const dispatch = useDispatch()

  const { counter } = useSelector((store: RootStore) => store.main)

  const [value, setValue] = useState(counter)

  useEffect(() => {
    console.log(counter)
  }, [counter])

  return (
    <div>
      <span>Main</span>
      <PlusOutlined />
      <div>
        <input value={value} onChange={e => setValue(parseInt(e.target.value))} />
        <button onClick={() => dispatch(setCounter({ counter: value }))}>保存</button>
      </div>
    </div>
  )
}
