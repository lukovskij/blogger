import { appName, API_ENDPOINT } from '../config'
import { call, take, put, all, select } from 'redux-saga/effects'
import axios from 'axios'

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

const defaultState = {
  entities: [],
  loading: false,
  error: null,
  article: {},
}

export default function(state = defaultState, action) {
  const { payload, type } = action

  switch (type) {
    case GET_ARTICLES_REQUEST:
    case SET_LIKE_REQUEST:
    case GET_ARTICLE_REQUEST:
      return { ...state, loading: true }

    case GET_ARTICLES_SUCCESS:
      return { ...state, loading: false, entities: [...payload.articles] }

    case GET_ARTICLE_SUCCESS:
      console.log(payload.article)
      return { ...state, loading: false, article: payload.article }

    case SET_LIKE_SUCCESS:
      return {
        ...state,
        entities: [
          ...state.entities.map(it => {
            if (it.slug === payload.article.slug) return { ...payload.article }
            return it
          }),
        ],
        loading: false,
      }

    case GET_ARTICLES_ERROR:
    case SET_LIKE_ERROR:
      return { ...state, error: payload.error }

    default:
      return state
  }
}

//AC
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

//selectors

//sagas
const getArticlesSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_ARTICLES_REQUEST)
    try {
      let res = yield call(axios.get, `${API_ENDPOINT}articles`)
      yield put({
        type: GET_ARTICLES_SUCCESS,
        payload: { articles: res.data.articles },
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
      let res = yield call(axios[method], `${API_ENDPOINT}articles/${payload.id}/favorite`)
      console.log(res.data.article)
      yield put({
        type: SET_LIKE_SUCCESS,
        payload: {
          article: res.data.article,
        },
      })
    } catch (error) {
      yield put({
        type: SET_LIKE_ERROR,
        error: { error },
      })
    }
  }
}

const getAerticleSaga = function*() {
  while (true) {
    let { payload } = yield take(GET_ARTICLE_REQUEST)
    try {
      let res = yield call(axios.get, `${API_ENDPOINT}articles/${payload.id}`)
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
//     console.log(payload)
//   }
// }

export const saga = function*() {
  yield all([getArticlesSaga(), toggleLikeSaga(), getAerticleSaga()])
}
