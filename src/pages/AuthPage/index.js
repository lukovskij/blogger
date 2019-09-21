import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonPage, IonFooter } from '@ionic/react'
import { signUpAC, signInAC } from '../../ducks/auth'
import { Route, Switch } from 'react-router-dom'
import TitlePage from '../../components/TitlePage'
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
        <IonPage>
          <TitlePage>Auth page</TitlePage>
          <Switch>
            <Route path="/auth/signin" render={this.renderComponent('signin')} />
            <Route path="/auth/signup" render={this.renderComponent('signup')} />
          </Switch>
          <IonFooter />
        </IonPage>
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
  null,
  { signUpAC, signInAC },
)(AuthPage)
