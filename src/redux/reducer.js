import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

//import dugs
import auth, { moduleName as authModule } from '../ducks/auth'
import articles, { moduleName as articlesModule } from '../ducks/articles'
import user, { moduleName as userModulde } from '../ducks/user'
import comments, { moduleName as commentsModule } from '../ducks/comments'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    [authModule]: auth,
    [articlesModule]: articles,
    [userModulde]: user,
    [commentsModule]: comments,
  })

export default createRootReducer
