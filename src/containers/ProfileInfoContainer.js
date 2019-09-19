import React, { Component } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import { moduleName as userModule, toggleFollowAC, getUserAC } from '../ducks/user'
import { moduleName as authModule } from '../ducks/auth'
import { moduleName as articlesModule, toggleArticleAC } from '../ducks/articles'
import { connect } from 'react-redux'

class ProfileInfoContainer extends Component {
  componentDidMount() {
    this.props.getUserAC(this.props.username)
  }
  render() {
    const { username, ...pasProps } = this.props
    return (
      <ProfileInfo
        {...pasProps}
        toggleLikeHandler={this.props.toggleArticleAC}
        togglFollowHandler={this.props.toggleFollowAC}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { author, ...rest } = state[articlesModule].article
  return {
    author: state[userModule].user,
    article: rest,
    authUser: state[authModule].user,
    username: author.username,
    ...ownProps,
  }
}
export default connect(
  mapStateToProps,
  { toggleArticleAC, toggleFollowAC, getUserAC },
)(ProfileInfoContainer)
