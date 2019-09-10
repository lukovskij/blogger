import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moduleName as auth, checkLogginUserAC } from '../ducks/auth'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
  componentDidMount() {
    this.props.checkLogginUserAC(this.props.location)
  }
  render() {
    const { component: ComponentItem, loggin, location, ...rest } = this.props
    if (loggin) return <Route {...rest} render={() => <ComponentItem {...rest} />} />
    else return <Redirect from={location.pathname} to={'/auth/signin'} />
  }
}

const mapStateToProps = state => {
  return {
    loggin: state[auth].loggin,
    location: state.router.location,
  }
}
export default connect(
  mapStateToProps,
  { checkLogginUserAC },
)(ProtectedRoute)
