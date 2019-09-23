import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonCard } from '@ionic/react'
import {
  moduleName as articlesModule,
  getArticlesAC,
  toggleArticleAC,
  getArticlesSelector,
} from '../ducks/articles'
import { moduleName as authModule } from '../ducks/auth'
import ArticlesList from '../components/ArticlesList'
import Pagination from '../components/Pagination'
import Preloader from '../components/Preloader'
class ArticleListContainer extends Component {
  state = {
    activePage: 1,
    countPerPage: 20,
  }
  componentDidMount() {
    this.props.getArticlesAC(this.props.query)
  }
  pageChangeHandler = pageNumber => {
    let query = this.props.query || ''
    this.props.getArticlesAC(query + '?limit=20&offset=' + pageNumber * 20)
    this.setState({
      activePage: pageNumber,
    })
  }

  showArticleList = () => {
    const { articles, toggleArticleAC, userId, pageCount } = this.props

    return (
      <>
        <ArticlesList userId={userId} articles={articles} toggleLikeHandler={toggleArticleAC} />
        {this.state.countPerPage <= pageCount && (
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.countPerPage}
            totalItemsCount={pageCount}
            pageRangeDisplayed={
              pageCount / this.state.countPerPage > 5
                ? 5
                : Math.floor(pageCount / this.state.countPerPage)
            }
            onChange={this.pageChangeHandler}
          />
        )}
      </>
    )
  }
  render() {
    const { loading } = this.props

    return <>{loading ? <Preloader show={loading} /> : this.showArticleList()}</>
  }
}

const mapStateToProps = state => {
  return {
    articles: getArticlesSelector(state),
    pageCount: state[articlesModule].articlesCount,
    userId: state[authModule].user.username,
    loading: state[articlesModule].loading,
  }
}
export default connect(
  mapStateToProps,
  { getArticlesAC, toggleArticleAC },
)(ArticleListContainer)
