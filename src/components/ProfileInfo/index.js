import React from 'react'
import { IonAvatar, IonButton, IonCard } from '@ionic/react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../UI/LikeButton'
import './style.scss'

export default function ProfileInfo(props) {
  console.log(props)
  return (
    <IonCard className="profile-info">
      <div className="profile-info__user">
        <Link className="profile-info__profile" to={'/profile/' + props.author.username}>
          <IonAvatar className="profile-info__avatar" slot="start">
            <img src={props.author.image} />
          </IonAvatar>
          <div className="date-name">
            <div className="name">{props.author.username}</div>
            <div className="date">{moment(props.article.createdAt).format('DD.MM.YYYY')}</div>
          </div>
        </Link>
      </div>
      <div className="profile-info__buttons">
        <IonButton
          onClick={() => props.togglFollowHandler(props.author.username)}
          color={props.author.following ? 'secondary' : 'success'}
          size="small"
        >
          {props.author.following ? 'Unfollow' : 'Follow'}
        </IonButton>
        <div className="profile-info__likes">
          <LikeButton
            idItem={props.article.slug}
            check={props.article.favorited}
            toggleLike={props.toggleLikeHandler}
          />
          <div className="count">{props.article.favoritesCount}</div>
        </div>
      </div>
    </IonCard>
  )
}
