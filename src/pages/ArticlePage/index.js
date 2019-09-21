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
  IonChip,
  IonFooter,
  IonPage,
} from '@ionic/react'
import TitlePage from '../../components/TitlePage'
import { connect } from 'react-redux'
import { moduleName as articles, getArticleAC, removeArticleAC } from '../../ducks/articles'
import { moduleName as authUser } from '../../ducks/auth'
import { push } from 'connected-react-router'
import Comments from '../../components/Comments'
import ProfileInfoContainer from '../../containers/ProfileInfoContainer'
import Preloader from '../../components/Preloader'
import './style.scss'
class ArticlePage extends Component {
  componentWillMount() {
    this.props.getArticleAC(this.props.computedMatch.params.slug)
  }
  render() {
    return (
      <>
        {this.props.loading ? (
          <Preloader show={this.props.loading} />
        ) : (
          <>
            <IonPage>
              <TitlePage>{this.checkTitle()}</TitlePage>
              <IonContent>{this.checkContent()}</IonContent>
              <IonFooter />
            </IonPage>
          </>
        )}
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
          <IonCardContent>
            {this.props.article.body}
            <div className="article-page__tags">
              {' '}
              {this.props.article.tagList.map(it => (
                <IonChip key={it}>
                  <IonLabel>{it}</IonLabel>
                </IonChip>
              ))}
            </div>
          </IonCardContent>
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
        <ProfileInfoContainer article={this.props.article} />
        <Comments />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    article: state[articles].article,
    loading: state[articles].article.articleLoading,
    authUser: state[authUser].user.username,
  }
}
export default connect(
  mapStateToProps,
  { getArticleAC, push, removeArticleAC },
)(ArticlePage)
