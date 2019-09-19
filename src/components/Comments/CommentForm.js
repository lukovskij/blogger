import React, { Component } from 'react'
import { IonTextarea, IonButton, IonAvatar, IonItem } from '@ionic/react'

export default class CommentForm extends Component {
  render() {
    return (
      <div className="comment-form">
        <IonItem className="comment-form__text">
          <IonTextarea rows="5" autoGrow={true}></IonTextarea>
        </IonItem>
        <div className="comment-form__options">
          <IonAvatar /> <IonButton>Add Comment</IonButton>
        </div>
      </div>
    )
  }
}
