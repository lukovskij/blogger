import React, { Component } from 'react'
import Comments from '../components/Comments/Comments'
import { connect } from 'react-redux'
import {
  moduleName as commentModule,
  removeCommentAC,
  getCommentsAC,
  getJsComments,
  getCommentsLoading,
} from '../ducks/comments'
import { getArticleId } from '../ducks/articles'
import { getUserNameSelector } from '../ducks/auth'

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
  return {
    comments: getJsComments(state),
    authUser: getUserNameSelector(state),
    articleId: getArticleId(state),
    loading: getCommentsLoading(state),
  }
}
export default connect(
  mapStateToProps,
  { removeCommentAC, getCommentsAC },
)(CommentFormContainer)
