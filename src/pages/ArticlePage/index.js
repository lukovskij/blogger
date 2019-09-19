import React, { Component } from 'react'
import {
  IonContent,
  IonCard,
  IonLabel,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonItem,
  IonCardSubtitle,
  IonButton,
  IonButtons,
} from '@ionic/react'
import TitlePage from '../../components/TitlePage'
import { connect } from 'react-redux'
import { moduleName as articles, getArticleAC, removeArticleAC } from '../../ducks/articles'
import { moduleName as authUser } from '../../ducks/auth'
import { push } from 'connected-react-router'
import Comments from '../../components/Comments'
import ProfileInfoContainer from '../../containers/ProfileInfoContainer'
import './style.scss'
class ArticlePage extends Component {
  componentWillMount() {
    this.props.getArticleAC(this.props.computedMatch.params.slug)
  }
  render() {
    //const { article } = this.props
    return (
      <>
        <TitlePage>{this.checkTitle()}</TitlePage>
        <IonContent scrollY={true}>{this.checkContent()}</IonContent>
      </>
    )
  }

  checkTitle = () => {
    if (this.props.article) {
      return <>Article name: {this.props.article.title}</>
    } else {
      return <>Please wait ...</>
    }
  }
  checkContent = () => {
    if (Object.keys(this.props.article).length) {
      return (
        <>
          <IonCard className="article-page">
            <IonImg src="https://picsum.photos/550/300" />
            <IonCardHeader>
              <IonCardSubtitle>
                <IonItem lines="none">
                  <IonLabel>{'Written by  - ' + this.props.article.author.username}</IonLabel>
                </IonItem>
              </IonCardSubtitle>
              <IonCardTitle>{this.props.article.description}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{this.props.article.body}</IonCardContent>
            {this.props.authUser === this.props.article.author.username && (
              <IonButtons>
                <IonButton
                  color="success"
                  onClick={() => {
                    this.props.push('/editor/' + this.props.article.slug)
                  }}
                >
                  Edit Article
                </IonButton>
                <IonButton onClick={() => this.props.removeArticleAC(this.props.article.slug)}>
                  Remove Article
                </IonButton>
              </IonButtons>
            )}
          </IonCard>
          <ProfileInfoContainer />
          <Comments />
        </>
      )
    } else {
      return <h1>Please wait ...</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    article: state[articles].article,
    authUser: state[authUser].user.username,
  }
}
export default connect(
  mapStateToProps,
  { getArticleAC, push, removeArticleAC },
)(ArticlePage)
