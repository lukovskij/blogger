import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moduleName, signOutAC } from '../ducks/auth'

export default function headerContainer(OriginalComponent) {
  class HeaderContainer extends Component {
    checkCurrentLinks = () => {
      console.log(this.props)
      if (this.props.loggin)
        return [
          { title: 'Home', path: '/', icon: 'home' },
          { title: 'My Profile', path: '/profile/' + this.props.user, icon: 'person' },
          { title: 'New Article', path: '/newarticle', icon: 'create' },
          { title: 'Settings', path: '/settings', icon: 'settings' },
          { title: 'Logout', path: '/auth/signin', icon: 'log-out' },
        ]
      else
        return [
          { title: 'Home', path: '/', icon: 'home' },
          { title: 'Login', path: '/auth/signin', icon: 'log-in' },
        ]
    }
    render() {
      return (
        <OriginalComponent
          signOutHandler={this.props.signOutAC}
          loggin={this.props.loggin}
          links={this.checkCurrentLinks()}
        />
      )
    }
  }
  const mapStateToProps = state => {
    return {
      loggin: state[moduleName].loggin,
      user: state[moduleName].user,
    }
  }
  return connect(
    mapStateToProps,
    { signOutAC },
  )(HeaderContainer)
}
