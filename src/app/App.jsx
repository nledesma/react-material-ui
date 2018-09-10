//  Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import CssBaseline from '@material-ui/core/CssBaseline'


// Imports
import Login from '../modules/login/Login'
import Inbox from '../modules/inbox/Inbox'
import PrivateRoute from '../utils/PrivateRoute'
import store from './store.js'


export class App extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <CssBaseline />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact={true} path="/" permiso={true} component={Inbox} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(App))