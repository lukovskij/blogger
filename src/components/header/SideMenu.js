import React, { Component } from 'react'
import {
  IonMenu,
  IonMenuToggle,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonList,
  IonContent,
  IonTitle,
  IonItem,
} from '@ionic/react'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false',
      routes: {
        appPages: [{ title: 'Home', path: '/', icon: 'home' }],
        loggedOutPages: [{ title: 'Login', path: '/login', icon: 'log-in' }],
      },
    }
    window.addEventListener('loggedIn', e => {
      this.setState({
        isLoggedIn: e['detail'].toString(),
        routes: {
          appPages: [{ title: 'Home', path: '/', icon: 'home' }],
          loggedInPages: [
            {
              title: 'My Profile',
              path: '/profile/' + localStorage.getItem('username'),
              icon: 'person',
            },
            { title: 'New Article', path: '/newarticle', icon: 'create' },
            { title: 'Settings', path: '/settings', icon: 'settings' },
            { title: 'Logout', path: '/login', icon: 'log-out' },
          ],
          loggedOutPages: [{ title: 'Login', path: '/login', icon: 'log-in' }],
        },
      })
    })
  }
  renderMenuItem(menu) {
    return (
      <IonMenuToggle key={menu.title} auto-hide="false">
        <IonItem>
          <IonIcon name={menu.icon}></IonIcon>
          <Link replace className="sidemenu-link" to={menu.path}>
            {menu.title}
          </Link>
        </IonItem>
      </IonMenuToggle>
    )
  }
  render() {
    return (
      <IonMenu side="start" menuId="first" contentId="main">
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle>Start Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {this.state.routes.appPages.map(art => this.renderMenuItem(art))}
            {this.state.isLoggedIn === 'true' ? (
              <> {this.state.routes.loggedInPages.map(art => this.renderMenuItem(art))} </>
            ) : (
              <> {this.state.routes.loggedOutPages.map(art => this.renderMenuItem(art))} </>
            )}
          </IonList>
        </IonContent>
      </IonMenu>
    )
  }
}
