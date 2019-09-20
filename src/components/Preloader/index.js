import React from 'react'
import { IonSpinner, IonContent } from '@ionic/react'
import { CSSTransition } from 'react-transition-group'
import './style.scss'

export default function Preloader(props) {
  return (
    <CSSTransition unmountOnExit in={props.show} classNames="spinner-animate" timeout={100000}>
      <div className="spinner">
        <IonSpinner color="primary" className="spinner-ico" name="crescent" />
      </div>
    </CSSTransition>
  )
}
