import React, { Component } from 'react'
import { IonApp, IonSplitPane, IonPage, IonRouterOutlet, IonContent, IonFooter } from '@ionic/react'
import SideMenu from './Header/SideMenu'
import Routes from '../routes'

class Root extends Component {
  render() {
    return (
      <IonApp>
        <IonSplitPane contentId="main">
          <SideMenu></SideMenu>
          <IonPage id="main">
            <Routes />
          </IonPage>
        </IonSplitPane>
      </IonApp>
    )
  }
}

export default Root
