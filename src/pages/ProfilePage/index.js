import React, { Component } from 'react'
import {
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonAvatar,
  IonButton,
} from '@ionic/react'
import { connect } from 'react-redux'
import { moduleName as userModule, getUserAC, toggleFollowAC } from '../../ducks/user'
import { moduleName as authModule } from '../../ducks/auth'
import TitlePage from '../../components/TitlePage'
import { push } from 'connected-react-router'
import './style.scss'

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getUserAC(this.props.computedMatch.params.authorname)
  }
  render() {
    const { user, authUser } = this.props
    console.log(user)
    return (
      <>
        <TitlePage>Profile</TitlePage>
        <IonContent>
          <IonCard className="profile-card">
            <IonAvatar className="profile-card__avatar">
              {user.image ? (
                <img src={user.image} alt="" />
              ) : (
                <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="" />
              )}
            </IonAvatar>
            <IonCardTitle className="profile-card__name">{user.username}</IonCardTitle>
            <IonCardSubtitle className="profile-card__subtitle">{user.bio}</IonCardSubtitle>
            {authUser.username === user.username ? (
              <IonButton
                className="profile-card__button"
                size="small"
                onClick={() => {
                  this.props.push('/settings')
                }}
              >
                Settings
              </IonButton>
            ) : (
              <IonButton
                onClick={() => {
                  this.props.toggleFollowAC(user.username)
                }}
                color={user.following ? 'secondary' : 'success'}
                className="profile-card__button"
                size="small"
              >
                {user.following ? 'Unfollow' : 'Follow'}
              </IonButton>
            )}
          </IonCard>
        </IonContent>
      </>
    )
  }
}

export default connect(
  state => ({
    user: state[userModule].user,
    authUser: state[authModule].user,
  }),
  { push, getUserAC, toggleFollowAC },
)(ProfilePage)
