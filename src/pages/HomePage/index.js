import React, { Component } from 'react'
import { IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/react'
import ArticlesListContainer from '../../containers/ArticlesListContainer'
import { connect } from 'react-redux'
import { moduleName as authModule } from '../../ducks/auth'

class HomePage extends Component {
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <ArticlesListContainer />
        </IonContent>
      </>
    )
  }
}

export default HomePage
