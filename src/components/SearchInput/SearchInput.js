import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import './SearchInput.css'

export default class SearchInput extends React.Component {
  state = {
    label: 'return',
  }

  debouncedSearchFunc = debounce((value) => {
    const { onSearchMovies } = this.props
    onSearchMovies(value)
  }, 500)

  onLabelChange = (event) => {
    const {
      target: { value },
    } = event
    this.setState({
      label: value,
    })
    if (value === '' || value.search(/\S/) !== -1) {
      this.debouncedSearchFunc(value)
    }
  }

  render() {
    const { label } = this.state
    return (
      <Input placeholder="Type to search..." className="search-input" onChange={this.onLabelChange} value={label} />
    )
  }
}
