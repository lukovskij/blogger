import React from 'react'
import { IonItem, IonAvatar, IonText } from '@ionic/react'
import { Link } from 'react-router-dom'

export default function Comments() {
  return (
    <div className="comment-list">
      <div className="comment-item">
        <div className="comment-item__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolor, ratione aliquid illo
          laborum mollitia expedita molestiae nostrum, cum, labore consequatur corporis nobis! Ad
          laborum cupiditate minima, eligendi inventore tenetur?
        </div>
        <div className="comment-item__options">
          <Link className="comment-item__user" to={'/'}>
            <IonAvatar />
            <IonText>us name</IonText>
          </Link>
          <IonText>date</IonText>
        </div>
      </div>
    </div>
  )
}
