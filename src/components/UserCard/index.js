import React, { Component } from 'react'
import { IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonButton } from '@ionic/react'
import './style.scss'

export default class UserCard extends Component {
  render() {
    return (
      <>
        <IonCard className="profile-card">
          <IonAvatar className="profile-card__avatar">
            <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="" />
          </IonAvatar>
          <IonCardTitle className="profile-card__name">Hello world</IonCardTitle>
          <IonCardSubtitle className="profile-card__subtitle">Subtitle</IonCardSubtitle>
          <IonButton className="profile-card__button" size="small">
            + Follow
          </IonButton>
        </IonCard>
      </>
    )
  }
}
