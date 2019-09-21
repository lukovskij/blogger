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
  loading: true,
  loggin: false,
  user: {
    bio: null,
    createdAt: null,
    email: null,
    id: null,
    image: null,
    token: null,
    updatedAt: null,
    username: null,
  },
  error: null,
}
export default function(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return { ...state, loading: true }
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return { ...state, loading: false, user: { ...payload.user }, error: null, loggin: true }
    case SIGN_OUT_SUCCES:
      return { ...defaultState }
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
    case SIGN_OUT_ERROR:
      return { ...state, error: payload.error, loading: false }
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

export const checkLogginUserAC = (path = '') => {
  return {
    type: CHECK_LOGGIN_USER,
    payload: {
      path,
    },
  }
}

export const signOutAC = () => {
  return {
    type: SIGN_OUT_REQUEST,
  }
}

//sagas
export const checkLogginUserSaga = function*() {
  while (true) {
    let { payload } = yield take(CHECK_LOGGIN_USER)
    yield put({
      type: SIGN_IN_REQUEST,
      payload: {
        path: payload.path,
      },
    })
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

      let token = window.localStorage.getItem('token')

      if (token) {
        let resUser = yield call(axios.get, `${API_ENDPOINT}user`, {
          headers: { authorization: `Token ${token}` },
        })
        yield put({
          type: SIGN_IN_SUCCESS,
          payload: {
            user: resUser.data.user,
          },
        })
        yield put(push(payload.path))
      } else {
        const res = yield call(axios.post, `${API_ENDPOINT}users/login`, {
          user: { email: payload.email, password: payload.password },
        })
        yield put({
          type: SIGN_IN_SUCCESS,
          payload: {
            user: res.data.user,
          },
        })
        window.localStorage.setItem('token', res.data.user.token)
        yield put(push('/'))
      }
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
      //set header to axios
    } catch (error) {}
  }
}

export const saga = function*() {
  yield all([signUpSaga(), signInSaga(), checkLogginUserSaga(), signOutSaga()])
}
