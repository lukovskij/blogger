import { appName, API_ENDPOINT } from '../config'
import { take, call, all, put } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

//module settings
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_REQUEST = `${prefix}/SIGNUP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCES = `${prefix}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`
export const CHECK_LOGGIN_USER = `${prefix}/CHECK_LOGGIN_USER`

//action constants

//reducer
const defaultState = {
  loading: false,
  loggin: false,
  user: null,
  error: null,
}
export default function(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case '@@router/LOCATION_CHANGE': {
      console.log('dddd')
      return state
    }
    case SIGN_UP_REQUEST:
    case SIGN_UP_REQUEST:
      return { ...state, loading: true }
    case SIGN_IN_SUCCESS:
      return { ...state, loading: false, user: { ...payload.user }, error: null, loggin: true }
    case SIGN_UP_SUCCESS:
      return { ...state, loading: false, user: { ...payload.user }, error: null, loggin: true }
    case SIGN_IN_REQUEST:
      return { ...state, loading: true }
    case SIGN_OUT_SUCCES:
      return { ...defaultState }
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
    case SIGN_OUT_ERROR:
      return { ...state, error: payload.error }
    default:
      return state
  }
}

//selectors

//action creators
export const signUpAC = (username, email, password) => {
  return {
    type: SIGN_UP_REQUEST,
    payload: { username, email, password },
  }
}
export const signInAC = (email, password, remember = false) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password, remember },
  }
}

export const checkLogginUserAC = () => {
  return {
    type: CHECK_LOGGIN_USER,
  }
}

export const signOutAC = () => {
  console.log('ddsa')
  return {
    type: SIGN_OUT_REQUEST,
  }
}
//saggas
export const checkLogginUserSaga = function*() {
  while (true) {
    yield take(CHECK_LOGGIN_USER)

    let user = JSON.parse(window.localStorage.getItem('user'))
    if (user !== null) {
      yield put({
        type: SIGN_IN_REQUEST,
        payload: {
          email: user.email,
          password: user.password,
        },
      })
    }
  }
}
export const signUpSaga = function*() {
  while (true) {
    const { payload } = yield take(SIGN_UP_REQUEST)
    try {
      const res = yield axios.post(`${API_ENDPOINT}users`, {
        user: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        },
      })
      yield put({
        type: SIGN_UP_SUCCESS,
        payload: {
          user: res.data.user,
        },
      })
      yield put(push('/'))
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        payload: { error },
      })
    }
  }
}
export const signInSaga = function*() {
  while (true) {
    try {
      const { payload } = yield take(SIGN_IN_REQUEST)
      const res = yield call(axios.post, `${API_ENDPOINT}users/login`, {
        user: { email: payload.email, password: payload.password },
      })
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: {
          user: res.data.user,
        },
      })
      if (payload.remember) {
        window.localStorage.setItem('user', JSON.stringify({ ...payload }))
      }
      yield put(push('/'))
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        payload: { error },
      })
    }
  }
}

export const signOutSaga = function*() {
  while (true) {
    try {
      yield take(SIGN_OUT_REQUEST)
      window.localStorage.clear()
      yield put({
        type: SIGN_OUT_SUCCES,
      })
    } catch (error) {}
  }
}

export const saga = function*() {
  yield all([signUpSaga(), signInSaga(), checkLogginUserSaga(), signOutSaga()])
}
