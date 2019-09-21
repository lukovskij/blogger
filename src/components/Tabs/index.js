import React from 'react'
import { IonButton, IonButtons } from '@ionic/react'
import './style.scss'

export default function Tabs(props) {
  return (
    <div className="article-tabs">
      <div className="article-tabs__header">
        <IonButtons>
          {props.tabs.map(it => (
            <IonButton
              onClick={() => props.changeTab(it.id)}
              fill="solid"
              color={it.active ? 'success' : 'light'}
              key={it.id}
            >
              {it.name}
            </IonButton>
          ))}
        </IonButtons>
      </div>
      <div className="article-tabs__content">
        {props.tabs
          .filter(it => it.active)
          .map(it => (
            <div key={it.id} className="article-tabs__item">
              {props.render({ url: it.url })}
            </div>
          ))}
      </div>
    </div>
  )
}
