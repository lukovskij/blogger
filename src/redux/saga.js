import { fork } from 'redux-saga/effects'

//sagas
import { saga as authSaga } from '../ducks/auth'
import { saga as articlesSaga } from '../ducks/articles'

const rootSaga = function*() {
  yield fork(authSaga)
  yield fork(articlesSaga)
}

export default rootSaga
