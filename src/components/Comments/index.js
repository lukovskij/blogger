import React from 'react'
import CommentFormContainer from '../../containers/CommentFormContainer'
import CommentsContainer from '../../containers/CommentsContainer'
import { IonContent } from '@ionic/react'
import './style.scss'

export default function CommentsComponent() {
  return (
    <IonContent className="comments-wrapp">
      <CommentFormContainer />
      <CommentsContainer />
    </IonContent>
  )
}
