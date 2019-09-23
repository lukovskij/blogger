import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthUserSelector, authSelector, signOutAC } from '../ducks/auth'

export default function headerContainer(OriginalComponent) {
  class HeaderContainer extends Component {
    checkCurrentLinks = () => {
      if (this.props.loggin)
        return [
          { title: 'Home', path: '/', icon: 'home' },
          { title: 'My Profile', path: '/profile/' + this.props.user.username, icon: 'person' },
          { title: 'Add/Edit Article', path: '/editor', icon: 'create' },
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
      loggin: authSelector(state),
      user: getAuthUserSelector(state),
    }
  }
  return connect(
    mapStateToProps,
    { signOutAC },
  )(HeaderContainer)
}
