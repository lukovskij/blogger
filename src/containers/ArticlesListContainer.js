import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moduleName as articlesModule, getArticlesAC, toggleArticleAC } from '../ducks/articles'
import { moduleName as authModule } from '../ducks/auth'
import ArticlesList from '../components/ArticlesList'
class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.getArticlesAC()
  }

  render() {
    const { articles, toggleArticleAC, userId } = this.props
    return <ArticlesList userId={userId} articles={articles} toggleLikeHandler={toggleArticleAC} />
  }
}

const mapStateToProps = state => {
  return {
    articles: state[articlesModule].entities,
    userId: state[authModule].user.username,
  }
}
export default connect(
  mapStateToProps,
  { getArticlesAC, toggleArticleAC },
)(ArticleListContainer)
