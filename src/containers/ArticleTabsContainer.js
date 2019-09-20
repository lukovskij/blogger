import React, { Component } from 'react'
import ArticleTabs from '../components/Tabs'

class ArticleTabsContainer extends Component {
  state = {
    tabs: [...this.props.tabs],
  }
  changeTab = id => {
    console.log(id)
    this.setState({
      tabs: this.state.tabs.map(it => {
        if (it.id === id) return { ...it, active: true }
        return { ...it, active: false }
      }),
    })
  }
  render() {
    return (
      <>
        <ArticleTabs tabs={this.state.tabs} changeTab={this.changeTab} render={this.props.render} />
      </>
    )
  }
}
export default ArticleTabsContainer
