import React from 'react'
import { IonTextarea, IonButton, IonAvatar, IonItem } from '@ionic/react'

export default function CommentForm(props) {
  return (
    <div className="comment-form">
      <IonItem className="comment-form__text">
        <IonTextarea
          onIonChange={e => props.typeCommentHandler(e.target.value)}
          value={props.comment}
          rows="5"
          autoGrow={true}
        ></IonTextarea>
      </IonItem>
      <div className="comment-form__options">
        <IonAvatar /> <IonButton onClick={props.sendCommentHandler}>Add Comment</IonButton>
      </div>
    </div>
  )
}
