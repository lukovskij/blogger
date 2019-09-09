import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moduleName } from '../ducks/auth'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const { component: ComponentItem, loggin, location, ...rest } = this.props

    if (loggin) return <Route {...rest} render={() => <ComponentItem {...rest} />} />
    else return <Redirect from={location} to={'/auth/signin'} />
  }
}

const mapStateToProps = state => {
  return {
    loggin: state[moduleName].loggin,
    location: state.router.location,
  }
}
export default connect(mapStateToProps)(ProtectedRoute)
