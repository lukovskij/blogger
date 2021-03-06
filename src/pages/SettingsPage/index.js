import React, { Component } from 'react'
import {
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonCard,
  IonButton,
  IonTextarea,
  IonFooter,
  IonPage,
} from '@ionic/react'
import TitlePage from '../../components/TitlePage'
import './style.scss'
import { connect } from 'react-redux'
import { editUserAC } from '../../ducks/user'
import { getAuthUser } from '../../ducks/auth'
import { signOutAC } from '../../ducks/auth'

class SettingsPage extends Component {
  state = {
    image: this.props.user.image,
    username: this.props.user.username,
    password: '',
    bio: this.props.user.bio,
    email: this.props.user.email,
  }
  onChangeHandler = type => {
    return e => {
      this.setState({
        [type]: e.target.value,
      })
    }
  }
  saveHandler = () => {
    this.props.editUserAC(this.state)
  }
  render() {
    return (
      <>
        <IonPage>
          <TitlePage>Settings Profile</TitlePage>
          <IonContent>
            <IonCard>
              <IonTitle className="profile-settings-label">Url to your avatar</IonTitle>
              <IonItem>
                <IonInput
                  onIonChange={this.onChangeHandler('image')}
                  value={this.state.image}
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="profile-settings-label">Your login</IonTitle>
              <IonItem>
                <IonInput
                  onIonChange={this.onChangeHandler('username')}
                  value={this.state.username}
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="profile-settings-label">Your email</IonTitle>
              <IonItem>
                <IonInput
                  onIonChange={this.onChangeHandler('email')}
                  value={this.state.email}
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="profile-settings-label">Your password</IonTitle>
              <IonItem>
                <IonInput
                  onIonChange={this.onChangeHandler('password')}
                  value={this.state.password}
                  type="password"
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="profile-settings-label">Your Bio</IonTitle>
              <IonItem>
                <IonTextarea
                  onIonChange={this.onChangeHandler('bio')}
                  value={this.state.bio}
                  autoGrow={true}
                ></IonTextarea>
              </IonItem>
            </IonCard>
            <IonCard className="profile-settings-submit">
              <IonButton onClick={this.saveHandler}>Save setting</IonButton>
              <IonButton color="danger" onClick={() => this.props.signOutAC()}>
                Log out
              </IonButton>
            </IonCard>
          </IonContent>
          <IonFooter></IonFooter>
        </IonPage>
      </>
    )
  }
}

export default connect(
  state => ({
    user: getAuthUser(state),
  }),
  { editUserAC, signOutAC },
)(SettingsPage)
