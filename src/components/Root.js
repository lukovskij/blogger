import React, { Component } from 'react'
import { IonApp, IonSplitPane, IonPage } from '@ionic/react'
import { NotificationContainer } from 'react-notifications'
import SideMenu from './Header/SideMenu'
import Routes from '../routes'

class Root extends Component {
  render() {
    return (
      <>
        <NotificationContainer />
        <IonApp>
          <IonSplitPane contentId="main">
            <SideMenu></SideMenu>
            <IonPage id="main">
              <Routes />
            </IonPage>
          </IonSplitPane>
        </IonApp>
      </>
    )
  }
}

export default Root
