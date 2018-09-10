import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


export class Inbox extends React.Component {
  render() {
    return (
      <div>
        This is home
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
})

const mapStateToProps = (state) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Inbox))