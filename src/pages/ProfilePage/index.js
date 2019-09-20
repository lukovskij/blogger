import React, { Component } from 'react'
import {
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonAvatar,
  IonButton,
} from '@ionic/react'
import { connect } from 'react-redux'
import { moduleName as userModule, getUserAC, toggleFollowAC } from '../../ducks/user'
import { moduleName as authModule } from '../../ducks/auth'
import TitlePage from '../../components/TitlePage'
import ArticlesListContainer from '../../containers/ArticlesListContainer'
import ArticleTabsContainer from '../../containers/ArticleTabsContainer'
import { push } from 'connected-react-router'
import Preloader from '../../components/Preloader'
import './style.scss'

class ProfilePage extends Component {
  state = {
    tabs: [
      {
        name: 'My article',
        id: 'myarticle',
        active: true,
        url: '?author=',
      },
      {
        name: 'Favorited Articles',
        id: 'farticle',
        active: false,
        url: '?favorited=',
      },
    ],
  }
  componentDidMount() {
    console.log(this.props.computedMatch.params.authorname)
    if (this.props.computedMatch.params.authorname) {
      this.props.getUserAC(this.props.computedMatch.params.authorname)
    }
  }
  componentDidUpdate(prevState) {
    if (prevState.computedMatch.params.authorname !== this.props.computedMatch.params.authorname) {
      this.props.getUserAC(this.props.computedMatch.params.authorname)
    }
  }
  closeArg = user => {
    console.log(user, '------>')
    return ({ url }) => <ArticlesListContainer query={url + user} />
  }
  profileContent = () => {
    const { user, authUser } = this.props
    return (
      <IonContent>
        <IonCard className="profile-card">
          <IonAvatar className="profile-card__avatar">
            {user.image ? (
              <img src={user.image} alt="" />
            ) : (
              <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="" />
            )}
          </IonAvatar>
          <IonCardTitle className="profile-card__name">{user.username}</IonCardTitle>
          <IonCardSubtitle className="profile-card__subtitle">{user.bio}</IonCardSubtitle>
          {authUser.username === user.username ? (
            <IonButton
              className="profile-card__button"
              size="small"
              onClick={() => {
                this.props.push('/settings')
              }}
            >
              Settings
            </IonButton>
          ) : (
            <IonButton
              onClick={() => {
                this.props.toggleFollowAC(user.username)
              }}
              color={user.following ? 'secondary' : 'success'}
              className="profile-card__button"
              size="small"
            >
              {user.following ? 'Unfollow' : 'Follow'}
            </IonButton>
          )}
        </IonCard>
        <ArticleTabsContainer tabs={this.state.tabs} render={this.closeArg(user.username)} />
      </IonContent>
    )
  }
  render() {
    const { loading } = this.props
    return (
      <>
        <TitlePage>Profile</TitlePage>
        {loading ? <Preloader show={loading} /> : this.profileContent()}
      </>
    )
  }
}

export default connect(
  state => ({
    user: state[userModule].user,
    authUser: state[authModule].user,
    loading: state[userModule].loading,
  }),
  { push, getUserAC, toggleFollowAC },
)(ProfilePage)
