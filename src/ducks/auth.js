import { appName, API_ENDPOINT } from '../config'
import { take, call, all, put } from 'redux-saga/effects'

//module settings
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

//action constants

//reducer
export default function(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    default:
      return state
  }
}

//selectors

//action creators

//saggas
