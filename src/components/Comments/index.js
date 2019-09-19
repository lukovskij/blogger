import React, { Component } from 'react'
import CommentForm from './CommentForm'
import Comments from './Comments'
import { IonContent } from '@ionic/react'
import './style.scss'

export default class CommentsForm extends Component {
  state = {
    comment: '',
  }
  render() {
    return (
      <IonContent className="comments-wrapp">
        <CommentForm />
        <Comments />
      </IonContent>
    )
  }
}
