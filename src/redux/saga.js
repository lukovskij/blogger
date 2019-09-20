import { fork } from 'redux-saga/effects'

//sagas
import { saga as authSaga } from '../ducks/auth'
import { saga as articlesSaga } from '../ducks/articles'
import { saga as userSaga } from '../ducks/user'
import { saga as commentsSaga } from '../ducks/comments'

const rootSaga = function*() {
  yield fork(authSaga)
  yield fork(articlesSaga)
  yield fork(userSaga)
  yield fork(commentsSaga)
}

export default rootSaga
