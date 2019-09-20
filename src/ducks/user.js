import { appName, API_ENDPOINT } from '../config'
import { take, call, all, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const EDIT_USER_REQUEST = `${prefix}/EDIT_USER_REQUEST`
export const EDIT_USER_SUCCESS = `${prefix}/EDIT_USER_SUCCESS`
export const EDIT_USER_ERROR = `${prefix}/EDIT_USER_ERROR`
export const GET_USER_REQUEST = `${prefix}/GET_USER_REQUEST`
export const GET_USER_SUCCESS = `${prefix}/GET_USER_SUCCESS`
export const GET_USER_ERROR = `${prefix}/GET_USER_ERROR`
export const TOGGLE_FOLLOW_USER_REQUEST = `${prefix}/TOGGLE_FOLLOW_USER_REQUEST`
export const TOGGLE_FOLLOW_USER_SUCCESS = `${prefix}/TOGGLE_FOLLOW_USER_SUCCESS`
export const TOGGLE_FOLLOW_USER_ERROR = `${prefix}/TOGGLE_FOLLOW_USER_ERROR`

const defaultState = {
  user: {
    bio: null,
    following: null,
    image: null,
    username: null,
  },
  loading: true,
  error: null,
}

export default function(state = defaultState, action) {
  const { payload, type } = action

  switch (type) {
    case EDIT_USER_REQUEST:
    case GET_USER_REQUEST:
    case TOGGLE_FOLLOW_USER_REQUEST:
      return { ...state, loading: true }
    case EDIT_USER_SUCCESS:
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: { ...payload }, error: null }
    case TOGGLE_FOLLOW_USER_SUCCESS:
      return { ...state, loading: false, user: { ...payload } }
    case EDIT_USER_ERROR:
    case GET_USER_ERROR:
    case TOGGLE_FOLLOW_USER_ERROR:
      return { ...state, error: payload.error, loading: false }
    default:
      return state
  }
}

export const getUserAC = id => {
  return {
    type: GET_USER_REQUEST,
    payload: {
      id,
    },
  }
}
export const editUserAC = data => {
  return {
    type: EDIT_USER_REQUEST,
    payload: {
      ...data,
    },
  }
}

export const toggleFollowAC = id => {
  return {
    type: TOGGLE_FOLLOW_USER_REQUEST,
    payload: {
      id,
    },
  }
}
//saggas

export const toggleFollowSaga = function*() {
  while (true) {
    let { payload } = yield take(TOGGLE_FOLLOW_USER_REQUEST)
    let { user } = yield select()

    try {
      let res
      if (!user.user.following) {
        res = yield call(
          axios.post,
          `${API_ENDPOINT}profiles/${payload.id}/follow`,
          {},
          {
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`,
            },
          },
        )
      } else {
        res = yield call(axios.delete, `${API_ENDPOINT}profiles/${payload.id}/follow`, {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        })
      }
      console.log(res.data.profile)
      yield put({
        type: TOGGLE_FOLLOW_USER_SUCCESS,
        payload: {
          ...res.data.profile,
        },
      })
    } catch (error) {
      yield put({
        type: TOGGLE_FOLLOW_USER_ERROR,
        payload: { error },
      })
    }
  }
}

export const getUserSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_USER_REQUEST)
    console.log('id', payload.id)
    try {
      let res = yield call(axios.get, `${API_ENDPOINT}profiles/${payload.id}`, {
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
        },
      })
      console.log('---from saga', res.data.profile)
      yield put({
        type: GET_USER_SUCCESS,
        payload: {
          ...res.data.profile,
        },
      })
    } catch (error) {
      yield put({
        type: GET_USER_ERROR,
        payload: { error },
      })
    }
  }
}
export const editUserSaga = function*() {
  while (true) {
    let { payload } = yield take(EDIT_USER_REQUEST)
    try {
      const res = yield call(
        axios.put,
        `${API_ENDPOINT}user`,
        {
          user: {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            image: payload.image,
            bio: payload.bio,
          },
        },
        {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        },
      )
      yield put({
        type: EDIT_USER_SUCCESS,
        payload: {
          user: res.data.user,
        },
      })
    } catch (error) {
      yield put({
        type: EDIT_USER_ERROR,
        payload: { error },
      })
    }
  }
}

export const saga = function*() {
  yield all([getUserSaga(), editUserSaga(), toggleFollowSaga()])
}
