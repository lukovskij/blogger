import React, { Component } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import { moduleName as userModule, toggleFollowAC, getUserAC } from '../ducks/user'
import { moduleName as authModule } from '../ducks/auth'
import { toggleArticleAC } from '../ducks/articles'
import { connect } from 'react-redux'

class ProfileInfoContainer extends Component {
  componentDidMount() {
    // this.props.getUserAC(this.props.username)
  }
  render() {
    const { username, ...pasProps } = this.props
    console.log(this.props)
    return (
      <ProfileInfo
        {...pasProps}
        author={this.props.article.author}
        toggleLikeHandler={this.props.toggleArticleAC}
        togglFollowHandler={this.props.toggleFollowAC}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state[userModule].user)
  return {
    //author: state[userModule].user,
    authUser: state[authModule].user,
    username: ownProps.article.author.username,
    ...ownProps,
  }
}
export default connect(
  mapStateToProps,
  { toggleArticleAC, toggleFollowAC, getUserAC },
)(ProfileInfoContainer)
