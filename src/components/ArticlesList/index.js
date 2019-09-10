import React from 'react'
import Article from '../Article'

import './style.scss'

export default function ArticleList(props) {
  const { articles } = props
  return (
    <div className="article-list">
      {articles.map(it => (
        <Article toggleLikeHandler={props.toggleLikeHandler} key={it.slug} article={it} />
      ))}
    </div>
  )
}
