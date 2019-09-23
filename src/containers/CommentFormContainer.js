import React, { Component } from 'react'
import CommentForm from '../components/Comments/CommentForm'
import { connect } from 'react-redux'
import { addCommentAC } from '../ducks/comments'
import { getArticleSelector } from '../ducks/articles'

class CommentFormContainer extends Component {
  state = {
    comment: '',
  }
  typeCommentHandler = text => {
    this.setState({
      comment: text,
    })
  }
  sendCommentHandler = () => {
    this.props.addCommentAC({ body: this.state.comment, id: this.props.articleId })
    this.setState({
      comment: '',
    })
  }
  render() {
    return (
      <CommentForm
        sendCommentHandler={this.sendCommentHandler}
        comment={this.state.comment}
        typeCommentHandler={this.typeCommentHandler}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    articleId: getArticleSelector(state).slug,
  }
}
export default connect(
  mapStateToProps,
  { addCommentAC },
)(CommentFormContainer)
