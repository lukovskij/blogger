import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducer'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleWare = createSagaMiddleware()

export const history = createBrowserHistory()

//dev only
window.routeHistory = history

const store = createStore(
  createRootReducer(history),
  applyMiddleware(sagaMiddleWare, routerMiddleware(history)),
)

sagaMiddleWare.run(rootSaga)

export default store
//dev only
window.store = store
