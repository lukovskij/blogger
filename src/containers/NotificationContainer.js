import React, { Component } from 'react'
import 'react-notifications/lib/notifications.css'
import { NotificationManager } from 'react-notifications'
import { connect } from 'react-redux'
import { moduleName as authModule } from '../ducks/auth'
import { moduleName as articleModule } from '../ducks/articles'
import { moduleName as commentModule } from '../ducks/comments'
import { moduleName as userModule } from '../ducks/user'

class NotificationContainer extends Component {
  componentDidUpdate() {
    this.createNotification('error', this.props.authError.message)
  }
  componentDidMount() {
    this.createNotification('error', this.props.authError.message)
  }
  createNotification = (type, message) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message')
          break
        case 'success':
          NotificationManager.success('Success message', 'Title here')
          break
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000)
          break
        case 'error':
          NotificationManager.error(message, '', 5000)
          break
      }
    }
  }
  render() {
    return (
      <>
        <button
          style={{ position: 'fixed', top: '50%' }}
          onClick={this.createNotification('error', this.props.authError.message)}
        >
          {' '}
          click me
        </button>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    authError: state[authModule].error,
    errorsArray: [
      state[authModule].error,
      state[userModule].error,
      state[commentModule].error,
      state[articleModule].error,
    ],
  }
}
export default connect(mapStateToProps)(NotificationContainer)
