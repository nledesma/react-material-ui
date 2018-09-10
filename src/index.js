import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import store from './app/store.js'
import App from './app/App'
import history from './history'
import 'typeface-roboto'

ReactDOM.render(
  (<Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>),
  document.getElementById('root'))
