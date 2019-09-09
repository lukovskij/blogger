import React from 'react'
import { IonItem, IonAvatar, IonLabel } from '@ionic/react'

export default function Article() {
  return (
    <>
      <IonItem>
        <IonAvatar slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel color="success">
          <h3>User name</h3>
          <p>time</p>
        </IonLabel>
      </IonItem>
    </>
  )
}
