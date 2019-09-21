import React, { Component } from 'react'
import { IonContent, IonPage } from '@ionic/react'

export default class ErrorPage extends Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <h1>Not Found</h1>
        </IonContent>
      </IonPage>
    )
  }
}
