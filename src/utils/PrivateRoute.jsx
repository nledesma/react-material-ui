import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

export class PrivateRoute extends React.Component {
  constructor (props) {
    super()
    this.state = {
      redirect: []
    }
  }
  getRedirect () {
    if (!this.props.isAuthenticated) {
      return <Redirect to={{ pathname: '/login' }} />
    } else {
      return <Route exact={this.props.exact} path={this.props.path} component={this.props.component} />
    }
  }

  render () {
    return (
      <React.Fragment>
        { this.getRedirect()}
      </React.Fragment>
    )
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: Proptypes.bool,
  exact: Proptypes.bool,
  path: Proptypes.string,
  component: Proptypes.func
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
