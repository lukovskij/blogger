import React, { Component } from 'react'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonLabel,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonAvatar,
  IonItem,
  IonCardSubtitle,
} from '@ionic/react'
import { connect } from 'react-redux'
import { moduleName as articles, getArticleAC } from '../../ducks/articles'
class ArticlePage extends Component {
  componentWillMount() {
    this.props.getArticleAC(this.props.computedMatch.params.slug)
  }
  render() {
    //const { article } = this.props
    return (
      <>
        <IonHeader>
          <IonToolbar>{this.checkTitle()}</IonToolbar>
        </IonHeader>
        <IonContent>{this.checkContent()}</IonContent>
      </>
    )
  }

  checkTitle = () => {
    if (this.props.article) {
      return <IonTitle>Article name: {this.props.article.title}</IonTitle>
    } else {
      return <IonTitle>Please wait ...</IonTitle>
    }
  }
  checkContent = () => {
    if (Object.keys(this.props.article).length) {
      return (
        <IonCard>
          <IonImg src="https://picsum.photos/550/300" />
          <IonCardHeader>
            <IonCardSubtitle>
              <IonItem lines="none">
                <IonLabel>{'Written by  - ' + this.props.article.author.username}</IonLabel>
              </IonItem>
            </IonCardSubtitle>
            <IonCardTitle>{this.props.article.description}</IonCardTitle>
            <IonCardContent>{this.props.article.body}</IonCardContent>
          </IonCardHeader>
        </IonCard>
      )
    } else {
      return <h1>Please wait ...</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    article: state[articles].article,
  }
}
export default connect(
  mapStateToProps,
  { getArticleAC },
)(ArticlePage)
