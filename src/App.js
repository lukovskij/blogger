import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

//custom imports
import Root from './components/Root'
import store, { history } from './redux'
//style
import './styles/index.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </BrowserRouter>
    </Provider>
  )
}

export default App
