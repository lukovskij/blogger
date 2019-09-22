import { appName, API_ENDPOINT } from '../config'
import { call, take, put, all, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import axios from 'axios'
import {Record, List} from 'immutable'

export const moduleName = `articles`
const prefix = `${appName}/${moduleName}`

export const GET_ARTICLES_REQUEST = `${prefix}/GET_ARTICLES`
export const GET_ARTICLES_SUCCESS = `${prefix}/GET_ARTICLES_SUCCESS`
export const GET_ARTICLES_ERROR = `${prefix}/GET_ARTICLES_ERROR`
export const SET_LIKE_REQUEST = `${prefix}/SET_LIKE_REQUEST`
export const SET_LIKE_SUCCESS = `${prefix}/SET_LIKE_SUCCESS`
export const SET_LIKE_ERROR = `${prefix}/SET_LIKE_ERROR`
export const GET_ARTICLE_REQUEST = `${prefix}/GET_ARTICLE_REQUEST`
export const GET_ARTICLE_SUCCESS = `${prefix}/GET_ARTICLE_SUCCESS`
export const GET_ARTICLE_ERROR = `${prefix}/GET_ARTICLE_ERROR`
export const ADD_ARTICLE_REQUEST = `${prefix}/ADD_ARTICLE_REQUEST`
export const ADD_ARTICLE_SUCCESS = `${prefix}/ADD_ARTICLE_SUCCESS`
export const ADD_ARTICLE_ERROR = `${prefix}/ADD_ARTICLE_ERROR`
export const GET_EDIT_ARTICLE_REQUEST = `${prefix}/GET_EDIT_ARTICLE_REQUEST`
export const GET_EDIT_ARTICLE_SUCCESS = `${prefix}/GET_EDIT_ARTICLE_SUCCESS`
export const GET_EDIT_ARTICLE_ERROR = `${prefix}/GET_EDIT_ARTICLE_ERROR`
export const SEND_EDIT_ARTICLE_REQUEST = `${prefix}/SEND_EDIT_ARTICLE_REQUEST`
export const SEND_EDIT_ARTICLE_SUCCESS = `${prefix}/SEND_EDIT_ARTICLE_SUCCESS`
export const SEND_EDIT_ARTICLE_ERROR = `${prefix}/SEND_EDIT_ARTICLE_ERROR`
export const REMOVE_ARTICLE_REQUEST = `${prefix}/REMOVE_ARTICLE_REQUEST`
export const REMOVE_ARTICLE_SUCCESS = `${prefix}/REMOVE_ARTICLE_SUCCESS`
export const REMOVE_ARTICLE_ERROR = `${prefix}/REMOVE_ARTICLE_ERROR`

const defaultState = {
  entities: [],
  loading: true,
  error: null,
  article: {
    articleLoading: true,
  },
  articlesCount: 0,
  articleToEdit: {
    title: null,
    description: null,
    body: null,
    tagList: [],
  },
}

const 

export default function(state = defaultState, action) {
  const { payload, type } = action

  switch (type) {
    case GET_ARTICLES_REQUEST:
    case GET_EDIT_ARTICLE_REQUEST:
    case SEND_EDIT_ARTICLE_REQUEST:
    case ADD_ARTICLE_REQUEST:
    case REMOVE_ARTICLE_REQUEST:
      return { ...state, loading: true }

    case GET_ARTICLE_REQUEST:
      return { ...state, article: { articleLoading: true } }

    case SET_LIKE_REQUEST:
      return { ...state, loading: false }

    case GET_EDIT_ARTICLE_SUCCESS:
    case SEND_EDIT_ARTICLE_SUCCESS:
      return { ...state, loading: false, articleToEdit: { ...payload } }
    case GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        loading: false,
        entities: [...payload.articles],
        articlesCount: payload.articlesCount,
      }
    }
    case GET_ARTICLE_SUCCESS:
      return { ...state, article: { ...payload.article, articleLoading: false } }

    case ADD_ARTICLE_SUCCESS:
    case REMOVE_ARTICLE_SUCCESS:
      return { ...state, loading: false }

    case SET_LIKE_SUCCESS:
      return {
        ...state,
        entities: [
          ...state.entities.map(it => {
            if (it.slug === payload.article.slug) return { ...payload.article }
            return it
          }),
        ],
        article: { ...payload.article },
        loading: false,
      }

    case GET_EDIT_ARTICLE_ERROR:
    case SEND_EDIT_ARTICLE_ERROR:
    case GET_ARTICLES_ERROR:
    case SET_LIKE_ERROR:
    case ADD_ARTICLE_ERROR:
    case REMOVE_ARTICLE_ERROR:
      return { ...state, error: payload.error, loading: false }

    case GET_ARTICLE_ERROR:
      return { ...state, article: { articleLoading: false } }

    default:
      return state
  }
}

//AC
export const getEditArticleAC = id => {
  return {
    type: GET_EDIT_ARTICLE_REQUEST,
    payload: {
      id,
    },
  }
}
export const editArticleAC = data => {
  return {
    type: SEND_EDIT_ARTICLE_REQUEST,
    payload: {
      data,
    },
  }
}
export const addArticleAC = data => {
  return {
    type: ADD_ARTICLE_REQUEST,
    payload: {
      ...data,
    },
  }
}
export const getArticlesAC = (params = '') => {
  return {
    type: GET_ARTICLES_REQUEST,
    payload: {
      params,
    },
  }
}

export const toggleArticleAC = id => {
  return {
    type: SET_LIKE_REQUEST,
    payload: {
      id,
    },
  }
}

export const getArticleAC = id => {
  return {
    type: GET_ARTICLE_REQUEST,
    payload: {
      id,
    },
  }
}

export const removeArticleAC = id => {
  return {
    type: REMOVE_ARTICLE_REQUEST,
    payload: {
      id,
    },
  }
}
//selectors

//sagas
const removeArticlSaga = function*() {
  while (true) {
    let { payload } = yield take(REMOVE_ARTICLE_REQUEST)

    try {
      let res = yield call(axios.delete, `${API_ENDPOINT}articles/${payload.id}`, {
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
        },
      })
      yield put({
        type: REMOVE_ARTICLE_SUCCESS,
      })
      yield put(push('/'))
    } catch (error) {
      yield put({
        type: REMOVE_ARTICLE_ERROR,
        payload: {
          error,
        },
      })
    }
  }
}

const sendEditArticleSaga = function*() {
  while (true) {
    let { payload } = yield take(SEND_EDIT_ARTICLE_REQUEST)
    try {
      let res = yield call(
        axios.put,
        `${API_ENDPOINT}articles/${payload.data.id}`,
        {
          article: {
            ...payload.data,
          },
        },
        {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        },
      )
      yield put({
        type: SEND_EDIT_ARTICLE_SUCCESS,
        payload: {
          ...res.data.article,
        },
      })
      yield put(push('/article/' + res.data.article.slug))
    } catch (error) {
      yield put({
        type: SEND_EDIT_ARTICLE_ERROR,
        payload: { error },
      })
    }
  }
}
const getEditArticleSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_EDIT_ARTICLE_REQUEST)
    try {
      let res = yield call(axios.get, `${API_ENDPOINT}articles/${payload.id}`, {
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
        },
      })
      yield put({
        type: GET_EDIT_ARTICLE_SUCCESS,
        payload: {
          ...res.data.article,
        },
      })
    } catch (error) {
      yield put({
        type: GET_EDIT_ARTICLE_ERROR,
        payload: {
          error,
        },
      })
    }
  }
}

const addArticleSaga = function*() {
  while (true) {
    let { payload } = yield take(ADD_ARTICLE_REQUEST)
    try {
      let res = yield call(
        axios.post,
        `${API_ENDPOINT}articles`,
        {
          article: {
            body: payload.body,
            title: payload.title,
            description: payload.description,
            tagList: payload.tagList,
          },
        },
        {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        },
      )
      yield put(push('/article/' + res.data.article.slug))
    } catch (error) {
      yield put({
        type: ADD_ARTICLE_ERROR,
        payload: { error },
      })
    }
  }
}
const getArticlesSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_ARTICLES_REQUEST)
    let token = window.localStorage.getItem('token')
    let header = {}
    if (token) {
      header = {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      }
    }
    try {
      let res = yield call(axios.get, `${API_ENDPOINT}articles${payload.params}`, {
        headers: header,
      })
      yield put({
        type: GET_ARTICLES_SUCCESS,
        payload: { articles: res.data.articles, articlesCount: res.data.articlesCount },
      })
    } catch (error) {
      yield put({
        type: GET_ARTICLES_ERROR,
        payload: { error },
      })
    }
  }
}
const toggleLikeSaga = function*() {
  while (true) {
    let { payload } = yield take(SET_LIKE_REQUEST)
    let method = 'post'
    let state = yield select()
    let articles = state.articles.entities
    articles.forEach(it => {
      if (it.slug === payload.id && it.favorited) {
        method = 'delete'
      }
    })
    try {
      let res = yield call(
        axios[method],
        `${API_ENDPOINT}articles/${payload.id}/favorite`,
        {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        },
        {
          headers: {
            authorization: `Token ${window.localStorage.getItem('token')}`,
          },
        },
      )

      yield put({
        type: SET_LIKE_SUCCESS,
        payload: {
          article: res.data.article,
        },
      })
    } catch (error) {
      yield put({
        type: SET_LIKE_ERROR,
        payload: { error },
      })
    }
  }
}

const getAerticleSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_ARTICLE_REQUEST)
    try {
      let res = yield call(axios.get, `${API_ENDPOINT}articles/${payload.id}`, {
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
        },
      })
      yield put({
        type: GET_ARTICLE_SUCCESS,
        payload: {
          article: res.data.article,
        },
      })
    } catch (error) {
      yield put({
        type: GET_ARTICLE_ERROR,
        payload: {
          error,
        },
      })
    }
  }
}
// const likeArticleSaga = function*() {
//   while (true) {
//     const payload = yield take(SET_LIKE_REQUEST)
//   }
// }

export const saga = function*() {
  yield all([
    getArticlesSaga(),
    toggleLikeSaga(),
    getAerticleSaga(),
    addArticleSaga(),
    getEditArticleSaga(),
    sendEditArticleSaga(),
    removeArticlSaga(),
  ])
}
