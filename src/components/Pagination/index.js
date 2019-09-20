import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import './style.scss'

export default class index extends Component {
  render() {
    return (
      <div className="pagination-wrapp">
        <Pagination {...this.props} />
      </div>
    )
  }
}
