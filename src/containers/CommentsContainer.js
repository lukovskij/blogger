import React, { Component } from 'react'
import Comments from '../components/Comments/Comments'
import { connect } from 'react-redux'
import { moduleName as commentModule, removeCommentAC, getCommentsAC } from '../ducks/comments'
import { moduleName as articleModule } from '../ducks/articles'
import { moduleName as authModule } from '../ducks/auth'

class CommentFormContainer extends Component {
  componentDidMount() {
    this.props.getCommentsAC(this.props.articleId)
  }
  removeCommentHandler = id => {
    console.log('----listen')
    this.props.removeCommentAC(id, this.props.articleId)
  }
  render() {
    return (
      <Comments
        removeCommentHandler={this.removeCommentHandler}
        comments={this.props.comments}
        authUser={this.props.authUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    comments: state[commentModule].comments,
    authUser: state[authModule].user.username,
    articleId: state[articleModule].article.slug,
  }
}
export default connect(
  mapStateToProps,
  { removeCommentAC, getCommentsAC },
)(CommentFormContainer)
