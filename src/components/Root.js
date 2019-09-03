import React, { Component } from 'react'
import { IonApp, IonSplitPane, IonPage, IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router-dom'
import SideMenu from './header/SideMenu'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ArticlePage from '../pages/ArticlePage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import NewArticlePage from '../pages/NewArticlePage'
export default class Root extends Component {
  render() {
    return (
      <IonApp>
        <IonSplitPane contentId="main">
          <SideMenu></SideMenu>
          <IonPage id="main">
            <IonRouterOutlet>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/article/:slug" component={ArticlePage} />
              <Route path="/profile/:authorname" component={ProfilePage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/newarticle" component={NewArticlePage} />
            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    )
  }
}
