import React, { Component } from 'react'
import { IonToolbar, IonHeader, IonTitle, IonContent } from '@ionic/react'
import ArticlesListContainer from '../../containers/ArticlesListContainer'
import ArticleTabsContainer from '../../containers/ArticleTabsContainer'
import { connect } from 'react-redux'
import { moduleName as authModule } from '../../ducks/auth'

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
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home Page</IonTitle>
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
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state[authModule].loggin)
  return {
    loggin: state[authModule].loggin,
  }
}
export default connect(mapStateToProps)(HomePage)
