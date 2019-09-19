import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'

const titlePageContainer = TitlePage => {
  class TitlePageContainer extends Component {
    render() {
      return <TitlePage goBack={this.props.goBack} {...this.props} />
    }
  }

  return connect(
    null,
    { goBack },
  )(TitlePageContainer)
}

export default titlePageContainer
