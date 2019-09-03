import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducer'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

//dev only
window.routeHistory = history

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history))),
  )
  return store
}

//dev only
window.store = configureStore()
