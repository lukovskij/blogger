import React from 'react'
import { IonAvatar, IonText, IonIcon, IonButton, IonButtons, IonToolbar } from '@ionic/react'
import moment from 'moment'
import RemoveIco from '../../components/UI/Icons/RemoveIco'
import { Link } from 'react-router-dom'

export default function Comments(props) {
  return (
    <div className="comment-list">
      {props.comments.map(item => (
        <div className="comment-item" key={item.id}>
          <div className="comment-item__text">{item.body}</div>
          <div className="comment-item__options">
            <Link className="comment-item__user" to={'/profile/' + item.author.username}>
              <IonAvatar>
                <img src={item.author.image} alt="" />
              </IonAvatar>
              <IonText>{item.author.username}</IonText>
            </Link>
            <IonText>{moment(item.createdAt).format('DD.MM.YYYY')}</IonText>
            {item.author.username === props.authUser && (
              <IonButton
                onClick={() => {
                  props.removeCommentHandler(item.id)
                }}
                size="small"
                color="danger"
              >
                <RemoveIco />
              </IonButton>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
