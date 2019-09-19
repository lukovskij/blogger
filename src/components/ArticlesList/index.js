import React from 'react'
import Article from '../Article'

import './style.scss'

export default function ArticleList(props) {
  const { articles, userId } = props
  return (
    <div className="article-list">
      {articles.map(it => (
        <Article
          userId={userId}
          toggleLikeHandler={props.toggleLikeHandler}
          key={it.slug}
          article={it}
        />
      ))}
    </div>
  )
}
