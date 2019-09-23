import React, { Component } from 'react'
import Comments from '../components/Comments/Comments'
import { connect } from 'react-redux'
import {
  moduleName as commentModule,
  removeCommentAC,
  getCommentsAC,
  getJsComments,
} from '../ducks/comments'
import { moduleName as articleModule } from '../ducks/articles'
import { moduleName as authModule } from '../ducks/auth'

class CommentFormContainer extends Component {
  componentDidMount() {
    if (this.props.articleId) this.props.getCommentsAC(this.props.articleId)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.articleId !== this.props.articleId) {
      this.props.getCommentsAC(this.props.articleId)
    }
  }
  removeCommentHandler = id => {
    this.props.removeCommentAC(id, this.props.articleId)
  }
  render() {
    return (
      <>
        {this.props.articleId && (
          <Comments
            removeCommentHandler={this.removeCommentHandler}
            comments={this.props.comments}
            authUser={this.props.authUser}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(getJsComments(state))
  return {
    comments: state[commentModule].comments,
    authUser: state[authModule].user.username,
    articleId: state[articleModule].article.slug,
    loading: state[commentModule].loading,
  }
}
export default connect(
  mapStateToProps,
  { removeCommentAC, getCommentsAC },
)(CommentFormContainer)
