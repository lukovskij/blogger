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
import headerContainer from '../../containers/headerContainer'

class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.signOutHandler)
    return (
      <IonMenu side="start" menuId="first" contentId="main">
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle>Start Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {this.props.links.map(link => (
              <IonMenuToggle key={link.title} autoHide={false}>
                <IonItem>
                  <IonIcon name={link.icon}></IonIcon>
                  {link.title.toLowerCase() === 'logout' ? (
                    <Link
                      onClick={() => {
                        this.props.signOutHandler()
                      }}
                      replace
                      className="sidemenu-link"
                      to={link.path}
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <Link replace className="sidemenu-link" to={link.path}>
                      {link.title}
                    </Link>
                  )}
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>
    )
  }
}

export default headerContainer(SideMenu)
