import { fork } from 'redux-saga/effects'

//sagas
import { saga as authSaga } from '../ducks/auth'

const rootSaga = function*() {
  yield fork(authSaga)
}

export default rootSaga
