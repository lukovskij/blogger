import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import ArticlePage from '../pages/ArticlePage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import NewArticlePage from '../pages/NewArticlePage'
import ErrorPage from '../pages/404'
import { connect } from 'react-redux'
import { moduleName, checkLogginUserAC } from '../ducks/auth'
import ProtectedRoute from '../containers/ProtectedRoute'

class Routes extends Component {
  componentDidMount() {
    this.props.checkLogginUserAC()
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth/signin" component={AuthPage} />
          <Route path="/auth/signup" component={AuthPage} />
          <ProtectedRoute path="/article/:slug" component={ArticlePage} />
          <ProtectedRoute path="/profile/:authorname" component={ProfilePage} />
          <ProtectedRoute path="/settings" component={SettingsPage} />
          <ProtectedRoute path="/newarticle" component={NewArticlePage} />
          <Redirect from="*" to="/404" />
          <Route path="/404" component={ErrorPage}></Route>
        </Switch>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {}
}
export default connect(
  null,
  { checkLogginUserAC },
)(Routes)
