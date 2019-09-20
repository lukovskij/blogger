import React, { Component } from 'react'
import { IonInput, IonContent, IonItem, IonHeader, IonButton, IonList } from '@ionic/react'
import { Link } from 'react-router-dom'
export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
    remember: false,
  }
  sendDataHandler = () => {
    const { email, password, remember } = this.state
    this.props.listener(email, password, remember)
  }
  onChangeHandler = type => e => {
    if (type === 'remember') {
      this.setState({ [type]: !this.state[type] })
    } else {
      this.setState({ [type]: e.target.value })
    }
  }
  render() {
    return (
      <>
        <IonContent padding>
          <form>
            <IonList>
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
                Sign In
              </IonButton>
              <IonButton color="success">
                <Link to={`/auth/signup`}>Registration</Link>
              </IonButton>
            </IonList>
          </form>
        </IonContent>
      </>
    )
  }
}
