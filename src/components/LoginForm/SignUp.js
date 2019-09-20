import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IonInput, IonContent, IonItem, IonHeader, IonButton, IonList } from '@ionic/react'

export default class SignUp extends Component {
  state = {
    email: '',
    username: '',
    password: '',
  }
  sendDataHandler = () => {
    const { email, username, password } = this.state
    this.props.listener(username, email, password)
  }
  onChangeHandler = type => e => {
    this.setState({ [type]: e.target.value })
  }
  render() {
    return (
      <>
        <IonContent padding>
          <form>
            <IonList>
              <IonItem>
                <IonInput
                  value={this.state.username}
                  name="username"
                  placeholder="Username"
                  type="text"
                  onIonChange={this.onChangeHandler('username')}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  onIonChange={this.onChangeHandler('email')}
                  value={this.state.email}
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </IonItem>
              <IonItem>
                <IonInput
                  onIonChange={this.onChangeHandler('password')}
                  value={this.state.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </IonItem>
              <IonButton onClick={this.sendDataHandler} color="primary">
                Sign Up
              </IonButton>
              <IonButton color="success">
                <Link to="/auth/signin">Login</Link>
              </IonButton>
            </IonList>
          </form>
        </IonContent>
      </>
    )
  }
}
