import React, { useState } from 'react'
import './style.scss'
export default function LikeButton(props) {
  const icoClass = props.check
    ? 'icon ion-md-heart application-icon active'
    : 'icon ion-md-heart application-icon disable'
  return (
    <div className="like-button" onClick={onClickHandler(props.toggleLike, props.idItem)}>
      <i className={icoClass}></i>
    </div>
  )
}

function onClickHandler(callback, idItem) {
  return () => {
    callback && callback(idItem)
  }
}
