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
import { NavLink } from 'react-router-dom'
import headerContainer from '../../containers/headerContainer'

import './style.scss'

function SideMenu(props) {
  return (
    <IonMenu side="start" menuId="first" contentId="main">
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {props.links.map(link => (
            <IonMenuToggle key={link.title} autoHide={false}>
              <IonItem>
                <IonIcon name={link.icon}></IonIcon>
                {link.title.toLowerCase() === 'logout' ? (
                  <NavLink
                    exact
                    activeClassName="active"
                    onClick={() => {
                      props.signOutHandler()
                    }}
                    replace
                    className="sidemenu-link"
                    to={link.path}
                  >
                    {link.title}
                  </NavLink>
                ) : (
                  <NavLink
                    exact
                    activeClassName="active"
                    replace
                    className="sidemenu-link"
                    to={link.path}
                  >
                    {link.title}
                  </NavLink>
                )}
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default headerContainer(SideMenu)
