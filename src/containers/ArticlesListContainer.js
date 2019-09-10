import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moduleName as articlesModule, getArticlesAC, toggleArticleAC } from '../ducks/articles'
import ArticlesList from '../components/ArticlesList'
class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.getArticlesAC()
  }
  render() {
    const { articles, toggleArticleAC } = this.props
    return <ArticlesList articles={articles} toggleLikeHandler={toggleArticleAC} />
  }
}

const mapStateToProps = state => {
  return {
    articles: state[articlesModule].entities,
  }
}
export default connect(
  mapStateToProps,
  { getArticlesAC, toggleArticleAC },
)(ArticleListContainer)
