import React, { Component } from 'react'
import { IonToolbar, IonHeader, IonTitle } from '@ionic/react'
import { connect } from 'react-redux'
import { signUpAC, signInAC, moduleName } from '../../ducks/auth'
import { Route, Redirect, Switch } from 'react-router-dom'
//custom components
import SignUp from '../../components/LoginForm/SignUp'
import SignIn from '../../components/LoginForm/SignIn'
class AuthPage extends Component {
  state = {
    redirect: false,
  }
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Auth page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Switch>
          <Route path="/auth/signin" render={this.renderComponent('signin')} />
          <Route path="/auth/signup" render={this.renderComponent('signup')} />
        </Switch>
      </>
    )
  }
  renderComponent = type => {
    return () => {
      if (type === 'signin') return <SignIn listener={this.props.signInAC} />
      if (type === 'signup') return <SignUp listener={this.props.signUpAC} />
    }
  }
}

export default connect(
  state => ({}),
  { signUpAC, signInAC },
)(AuthPage)