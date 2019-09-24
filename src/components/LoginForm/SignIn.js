import React, { useState } from 'react'
import { IonInput, IonContent, IonItem, IonHeader, IonButton, IonList } from '@ionic/react'
import { Link } from 'react-router-dom'
import { sendDataHandler } from './utils'

export default function SignIn(props) {
  const [email, emailChange] = useState('')
  const [password, passwordChange] = useState('')

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
                onIonChange={onChangeHandler(emailChange)}
                value={email}
                name="email"
                type="text"
                placeholder="Email"
              />
            </IonItem>
            <IonItem>
              <IonInput
                onIonChange={onChangeHandler(passwordChange)}
                value={password}
                name="password"
                type="password"
                placeholder="Password"
              />
            </IonItem>
            <IonButton onClick={sendDataHandler({ email, password }, props)} color="primary">
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
