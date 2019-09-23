import React, { Component } from 'react'
import {
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonCard,
  IonButton,
  IonTextarea,
  IonChip,
  IonPage,
  IonLabel,
  IonFooter,
} from '@ionic/react'
import TitlePage from '../../components/TitlePage'
import { connect } from 'react-redux'
import {
  moduleName as articleModule,
  addArticleAC,
  getEditArticleAC,
  editArticleAC,
} from '../../ducks/articles'
import './style.scss'

class EditArticlePage extends Component {
  state = {
    tagName: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
  }
  defaultState = {
    tagName: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
  }
  componentDidMount() {
    console.log(this.props.computedMatch.params.editId)
    let id = this.props.computedMatch.params.editId
    if (id) {
      this.props.getEditArticleAC(id)
      this.setState({
        tagName: '',
        title: this.props.article.title,
        description: this.props.article.description,
        body: this.props.article.body,
        tagList: this.props.article.tagList,
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.article) !== JSON.stringify(prevProps.article)) {
      this.setState({
        tagName: '',
        title: this.props.article.title,
        description: this.props.article.description,
        body: this.props.article.body,
        tagList: this.props.article.tagList,
      })
    }
    console.log(this.props.computedMatch.params.editId)
    if (!this.props.computedMatch.params.editId && this.state.title) {
      this.setState({ ...this.defaultState })
    }
  }
  changeArticleFieldHandler = type => e => {
    this.setState({
      [type]: e.target.value,
    })
  }
  addTagHandler = e => {
    if (e.key === 'Enter') {
      this.setState({
        tagList: [...this.state.tagList, this.state.tagName],
        tagName: '',
      })
    }
  }
  removeTagFromList(it) {
    return () => {
      this.setState({
        tagList: this.state.tagList.filter(item => item !== it),
      })
    }
  }
  addNewArticle = () => {
    let { tagName, ...args } = this.state

    let objectToAc = {
      ...args,
    }
    this.props.addArticleAC(objectToAc)
  }
  editArticle = () => {
    let { tagName, ...args } = this.state

    let objectToAc = {
      ...args,
      id: this.props.computedMatch.params.editId,
    }
    this.props.editArticleAC(objectToAc)
  }
  render() {
    const { title, description, body, tagName, tagList } = this.state
    return (
      <>
        <IonPage>
          <TitlePage>New Article</TitlePage>
          <IonContent>
            <IonCard>
              <IonTitle className="add-article-label">Article name</IonTitle>
              <IonItem className="add-article">
                <IonInput
                  onIonChange={this.changeArticleFieldHandler('title')}
                  value={title}
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="add-article-label">Article description</IonTitle>
              <IonItem className="add-article">
                <IonInput
                  onIonChange={this.changeArticleFieldHandler('description')}
                  value={description}
                ></IonInput>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="add-article-label">Article Text</IonTitle>
              <IonItem className="add-article">
                <IonTextarea
                  onIonChange={this.changeArticleFieldHandler('body')}
                  value={body}
                  autoGrow={true}
                ></IonTextarea>
              </IonItem>
            </IonCard>
            <IonCard>
              <IonTitle className="add-article-label">Tags</IonTitle>
              <IonItem className="add-article">
                <IonInput
                  onKeyPress={this.addTagHandler}
                  onIonChange={this.changeArticleFieldHandler('tagName')}
                  value={tagName}
                ></IonInput>
              </IonItem>
              {tagList.map(it => (
                <IonChip key={it} onClick={this.removeTagFromList(it)}>
                  <IonLabel>{it}</IonLabel>
                </IonChip>
              ))}
            </IonCard>
            <IonCard className="add-article-submit">
              {this.props.computedMatch.params.editId ? (
                <IonButton onClick={this.editArticle}>Edit article</IonButton>
              ) : (
                <IonButton onClick={this.addNewArticle}>Add article</IonButton>
              )}
            </IonCard>
          </IonContent>
          <IonFooter></IonFooter>
        </IonPage>
      </>
    )
  }
}

export default connect(
  state => ({
    article: state[articleModule].articleToEdit,
  }),
  { addArticleAC, getEditArticleAC, editArticleAC },
)(EditArticlePage)
