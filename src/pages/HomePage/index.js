import React, { Component } from 'react'
import { IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/react'
import ArticlesList from '../../components/ArticlesList'
import ArticlesListContainer from '../../containers/ArticlesListContainer'

export default class HomePage extends Component {
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
