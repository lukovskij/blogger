import React from 'react'
import LikeButton from '../UI/LikeButton'
import { IonButton, IonAvatar, IonChip, IonLabel } from '@ionic/react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './style.scss'

export default function Article({ article, toggleLikeHandler, userId }) {
  return (
    <div className="article-item">
      <div className="article-item__header">
        <div className="article-item__user">
          <IonAvatar slot="start">
            <img
              src={
                article.author.image ||
                'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
              }
            />
          </IonAvatar>
          <div className="article-item__user-info">
            <h3 className="article-item__username">
              <Link to={`/profile/${article.author.username}`}>{article.author.username}</Link>
            </h3>
            <p className="article-item__date">{moment(article.createdAt).format('MMMM DD YYYY')}</p>
          </div>
        </div>
        <div className="article-item__likes">
          <LikeButton
            idItem={article.slug}
            check={article.favorited}
            toggleLike={toggleLikeHandler}
          />
          <div className="article-item__likes-count">{article.favoritesCount}</div>
        </div>
      </div>
      <div className="article-item__content">
        <div className="article-item__title">{article.title}</div>
        <div className="article-item__descr">{article.description}</div>
      </div>
      <div className="article-item__footer">
        <Link to={`/article/${article.slug}`}>
          <IonButton size="small" color="secondary">
            Read More
          </IonButton>
        </Link>

        {article.author.username === userId ? (
          <Link to={`/editor/${article.slug}`}>
            <IonButton size="small" color="success">
              Edit
            </IonButton>
          </Link>
        ) : null}

        <div className="article-item__tags">
          {article.tagList.map(it => (
            <IonChip outline key={it}>
              <IonLabel>{it}</IonLabel>
            </IonChip>
          ))}
        </div>
      </div>
    </div>
  )
}
