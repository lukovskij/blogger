import React, { Component } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import { toggleFollowAC, getUserAC, getUserSelector } from '../ducks/user'
import { getAuthUserSelector } from '../ducks/auth'
import { toggleArticleAC, getArticleSelector } from '../ducks/articles'
import { connect } from 'react-redux'

class ProfileInfoContainer extends Component {
  componentDidMount() {
    this.props.getUserAC(this.props.author)
  }
  render() {
    return (
      <ProfileInfo
        author={this.props.user}
        article={this.props.article}
        toggleLikeHandler={this.props.toggleArticleAC}
        togglFollowHandler={this.props.toggleFollowAC}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    author: getArticleSelector(state).author.username,
    authUser: getAuthUserSelector(state),
    user: getUserSelector(state),
    article: getArticleSelector(state),
  }
}
export default connect(
  mapStateToProps,
  { toggleArticleAC, toggleFollowAC, getUserAC },
)(ProfileInfoContainer)
