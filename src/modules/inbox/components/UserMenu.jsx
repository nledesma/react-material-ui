import React from 'react'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { logout } from '../../login/authReducer'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

class UserMenu extends React.Component {
  constructor () {
    super()
    this.state = {
      anchorEl: null
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClick (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleLogout () {
    this.props.logout()
    this.handleClose()
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { anchorEl } = this.state

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup='true'
          style={{textTransform: 'lowercase'}}
          onClick={this.handleClick}>
          {this.props.email} <ArrowDropDown />
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          style={{marginLeft: '60px', marginTop: '40px'}}
        >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  email: state.authReducer.email
})

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatch)(UserMenu)
