import { appName, API_ENDPOINT } from '../config'
import { take, call, all, put } from 'redux-saga/effects'
import axios from 'axios'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'

export const moduleName = 'comments'
const prefix = `${appName}/${moduleName}`

export const ADD_COMMENT_REQUEST = `${prefix}/ADD_COMMENT_REQUEST`
export const ADD_COMMENT_SUCCESS = `${prefix}/ADD_COMMENT_SUCCESS`
export const ADD_COMMENT_ERROR = `${prefix}/ADD_COMMENT_ERROR`
export const GET_COMMENTS_REQUEST = `${prefix}/GET_COMMENTS_REQUEST`
export const GET_COMMENTS_SUCCESS = `${prefix}/GET_COMMENTS_SUCCESS`
export const GET_COMMENTS_ERROR = `${prefix}/GET_COMMENTS_ERROR`
export const REMOVE_COMMENT_REQUEST = `${prefix}/REMOVE_COMMENT_REQUEST`
export const REMOVE_COMMENT_SUCCESS = `${prefix}/REMOVE_COMMENT_SUCCESS`
export const REMOVE_COMMENT_ERROR = `${prefix}/REMOVE_COMMENT_ERROR`

const immutableDefaultState = Record({
  comments: List([]),
  loading: true,
  error: null,
})

export default function(state = new immutableDefaultState(), action) {
  const { payload, type } = action

  switch (type) {
    case ADD_COMMENT_REQUEST:
    case GET_COMMENTS_REQUEST:
    case REMOVE_COMMENT_REQUEST:
      return state.set('loading', true)
    case GET_COMMENTS_SUCCESS:
    case REMOVE_COMMENT_SUCCESS:
      return state.set('comments', new List([...payload.comments])).set('loading', false)
    case ADD_COMMENT_SUCCESS:
      return state.set('comments', state.comments.unshift(payload.comment))
    case ADD_COMMENT_ERROR:
    case GET_COMMENTS_ERROR:
    case REMOVE_COMMENT_ERROR:
      return state.set('loading', false).set('error', payload.error)
    default:
      return state
  }
}

export const getCommentsAC = id => {
  return {
    type: GET_COMMENTS_REQUEST,
    payload: {
      id,
    },
  }
}
export const addCommentAC = data => {
  return {
    type: ADD_COMMENT_REQUEST,
    payload: {
      ...data,
    },
  }
}

export const removeCommentAC = (commentId, articleId) => {
  return {
    type: REMOVE_COMMENT_REQUEST,
    payload: {
      commentId,
      articleId,
    },
  }
}

// selectors
export const getCommentsState = state => state[moduleName]
export const getCommentsEntities = createSelector(
  getCommentsState,
  items => items.comments,
)
export const getJsComments = createSelector(
  getCommentsEntities,
  items => items.valueSeq().toArray(),
)

//saggas

export const getCommentsSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_COMMENTS_REQUEST)
    let res = yield call(axios.get, `${API_ENDPOINT}articles/${payload.id}/comments`, {
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    })
    yield put({
      type: GET_COMMENTS_SUCCESS,
      payload: { comments: [...res.data.comments] },
    })
    try {
    } catch (error) {
      yield put({
        type: GET_COMMENTS_ERROR,
        payload: { error },
      })
    }
  }
}

export const addCommentSaga = function*() {
  while (true) {
    let { payload } = yield take(ADD_COMMENT_REQUEST)
    console.log(payload)
    try {
      let res = yield call(
        axios.post,
        `${API_ENDPOINT}articles/${payload.id}/comments`,
        {
          comment: {
            body: payload.body,
          },
        },
        {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        },
      )
      yield put({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          comment: res.data.comment,
        },
      })
    } catch (error) {
      yield put({
        type: ADD_COMMENT_ERROR,
        payload: { error },
      })
    }
  }
}

export const removeCommentSaga = function*() {
  while (true) {
    let { payload } = yield take(REMOVE_COMMENT_REQUEST)
    let res = yield call(
      axios.delete,
      `${API_ENDPOINT}articles/${payload.articleId}/comments/${payload.commentId}`,
      {
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
        },
      },
    )
    let comments = yield call(axios.get, `${API_ENDPOINT}articles/${payload.articleId}/comments`, {
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    })
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      payload: { comments: [...comments.data.comments] },
    })
    try {
    } catch (error) {
      yield put({
        type: REMOVE_COMMENT_ERROR,
        payload: { error },
      })
    }
  }
}
export const saga = function*() {
  yield all([getCommentsSaga(), addCommentSaga(), removeCommentSaga()])
}
