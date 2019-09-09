import React, { useState } from 'react'
import './style.scss'
export default function LikeButton(props) {
  const [like, setLike] = useState(false)
  const icoClass = like
    ? 'icon ion-md-heart application-icon active'
    : 'icon ion-md-heart application-icon disable'
  return (
    <div className="like-button" onClick={onClickHandler(setLike, like, props.setLike)}>
      <i className={icoClass}></i>
    </div>
  )
}

function onClickHandler(stateFunc, key, callback) {
  return () => {
    stateFunc(!key)
    callback && callback()
  }
}
