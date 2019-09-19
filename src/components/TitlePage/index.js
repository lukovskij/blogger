import React, { Component } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from '@ionic/react'
import titlePageContainer from '../../containers/TitlePageContainer'

class TitlePage extends Component {
  render() {
    return (
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={this.props.goBack}>
              <IonIcon name="arrow-back" />
            </IonButton>
          </IonButtons>
          <IonTitle>{this.props.children}</IonTitle>
        </IonToolbar>
      </IonHeader>
    )
  }
}

export default titlePageContainer(TitlePage)
