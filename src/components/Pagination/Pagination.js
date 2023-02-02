import React from 'react'
import { Pagination } from 'antd'

import './Pagination.css'

export default class PaginationComponent extends React.Component {
  onChange = (page) => {
    const { onPageChange } = this.props
    onPageChange(page)
  }

  render() {
    const { currentPage, totalItems } = this.props
    return (
      <Pagination
        current={currentPage}
        onChange={this.onChange}
        total={totalItems}
        pageSize="20"
        pageSizeOptions={[20]}
      />
    )
  }
}
