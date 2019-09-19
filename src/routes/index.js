import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import ArticlePage from '../pages/ArticlePage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import EditArticlePage from '../pages/EditArticlePage'
import ErrorPage from '../pages/404'
import ProtectedRoute from '../containers/ProtectedRoute'
import { moduleName as authModule, checkLogginUserAC } from '../ducks/auth'
import { connect } from 'react-redux'
import Preloader from '../components/Preloader'

class Routes extends Component {
  componentDidMount() {
    this.props.checkLogginUserAC(this.props.location)
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth/signin" component={AuthPage} />
          <Route path="/auth/signup" component={AuthPage} />
          <ProtectedRoute path="/article/:slug" component={ArticlePage} />
          <ProtectedRoute path="/profile/:authorname?" component={ProfilePage} />
          <ProtectedRoute path="/settings" component={SettingsPage} />
          <ProtectedRoute path="/editor/:editId?" component={EditArticlePage} />
          <Redirect from="*" to="/404" />
          <Route path="/404" component={ErrorPage}></Route>
        </Switch>
      </>
    )
  }
}

export default connect(
  state => ({
    loading: state[authModule].loading,
  }),
  { checkLogginUserAC },
)(Routes)
