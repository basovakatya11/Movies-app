import React from 'react'
import { Tabs } from 'antd'
import './Header.css'

const items = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
]

function Header({ onChange, tabNumber }) {
  return (
    <div className="header">
      <Tabs defaultActiveKey="1" activeKey={tabNumber} items={items} onChange={onChange} />
    </div>
  )
}

export default Header
