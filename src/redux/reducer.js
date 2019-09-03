import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

//import dugs
import auth, { moduleName as authModule } from '../ducks/auth'
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    [authModule]: auth,
  })

export default createRootReducer
