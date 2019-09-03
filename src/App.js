import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

//custom imports
import Root from './components/Root'
import configStore, { history } from './redux'
//style
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'

const store = configStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
