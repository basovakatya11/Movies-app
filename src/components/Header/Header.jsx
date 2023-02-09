import React from 'react'
import { Tabs } from 'antd'
import './Header.css'
import PropTypes from 'prop-types'

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

Header.propTypes = {
  onChange: PropTypes.func.isRequired,
  tabNumber: PropTypes.oneOf(['1', '2']).isRequired,
}

export default Header
