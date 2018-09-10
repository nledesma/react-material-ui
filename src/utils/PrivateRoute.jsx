import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

export class PrivateRoute extends React.Component {
  
  constructor() {
    super()
    this.state = {
      redirect: []
    }
  }

  getRedirect(){
    if (!this.props.isAuthenticated) {      
      return <Redirect to = {{ pathname:'/login' }}/>  
    }else if (!this.props.permiso) {     
      return <Redirect to = {{ pathname:'/' }}/>  
    }else{
      return <Route exact={this.props.exact} path={this.props.path} component={this.props.component} />
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.getRedirect()    
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))