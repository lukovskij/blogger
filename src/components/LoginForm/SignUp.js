import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IonInput, IonContent, IonItem, IonHeader, IonButton, IonList } from '@ionic/react'
import { sendDataHandler } from './utils'

export default function SignUp(props) {
  const [email, changeEmail] = useState('')
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')

  const onChangeHandler = type => e => {
    type(e.target.value)
  }
  return (
    <>
      <IonContent padding>
        <form>
          <IonList>
            <IonItem>
              <IonInput
                value={username}
                name="username"
                placeholder="Username"
                type="text"
                onIonChange={onChangeHandler(changeUsername)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                onIonChange={onChangeHandler(changeEmail)}
                value={email}
                name="email"
                type="text"
                placeholder="Email"
              />
            </IonItem>
            <IonItem>
              <IonInput
                onIonChange={onChangeHandler(changePassword)}
                value={password}
                name="password"
                type="password"
                placeholder="Password"
              />
            </IonItem>
            <IonButton
              onClick={sendDataHandler({ username, email, password }, props)}
              color="primary"
            >
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
