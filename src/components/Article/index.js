import React from 'react'
import LikeButton from '../UI/LikeButton'
import { IonButton, IonAvatar, IonChip, IonLabel } from '@ionic/react'

import './style.scss'

export default function Article() {
  return (
    <div className="article-item">
      <div className="article-item__header">
        <div className="article-item__user">
          <IonAvatar slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
          <div className="article-item__user-info">
            <h3 className="article-item__username">user</h3>
            <p className="article-item__date">comment</p>
          </div>
        </div>
        <div className="article-item__likes">
          <LikeButton />
          <div className="article-item__likes-count">3</div>
        </div>
      </div>
      <div className="article-item__content">
        <div className="article-item__title">Hi</div>
        <div className="article-item__descr">Hop lalalay</div>
      </div>
      <div className="article-item__footer">
        <IonButton size="small" color="secondary">
          {' '}
          Read More
        </IonButton>
        <div className="article-item__tags">
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonLabel>ll</IonLabel>
          </IonChip>
        </div>
      </div>
    </div>
  )
}
