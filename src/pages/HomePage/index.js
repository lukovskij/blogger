import React, { Component } from 'react'
import { IonToolbar, IonHeader, IonTitle, IonContent, IonFooter, IonPage } from '@ionic/react'
import ArticlesListContainer from '../../containers/ArticlesListContainer'
import ArticleTabsContainer from '../../containers/ArticleTabsContainer'
import { connect } from 'react-redux'
import { getLogginStatus } from '../../ducks/auth'

class HomePage extends Component {
  state = {
    tabs: [
      {
        name: 'Your feed',
        url: '/feed',
        id: 'feed',
        active: true,
      },
      {
        name: 'Global feed',
        url: '',
        id: 'your',
        active: false,
      },
    ],
  }

  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>New articles</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {this.props.loggin ? (
              <ArticleTabsContainer
                tabs={this.state.tabs}
                render={({ url }) => {
                  return <ArticlesListContainer query={url} />
                }}
              />
            ) : (
              <ArticlesListContainer query={''} />
            )}
          </IonContent>
          <IonFooter></IonFooter>
        </IonPage>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggin: getLogginStatus(state),
  }
}
export default connect(mapStateToProps)(HomePage)
