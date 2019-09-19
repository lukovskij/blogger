import { fork } from 'redux-saga/effects'

//sagas
import { saga as authSaga } from '../ducks/auth'
import { saga as articlesSaga } from '../ducks/articles'
import { saga as userSaga } from '../ducks/user'

const rootSaga = function*() {
  yield fork(authSaga)
  yield fork(articlesSaga)
  yield fork(userSaga)
}

export default rootSaga
