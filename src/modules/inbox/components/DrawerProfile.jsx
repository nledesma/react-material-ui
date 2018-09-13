import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import profileImage from '../../../dist/img/profile_placeholder.png'
import UserMenu from './UserMenu'

const avatarWidth = 100

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10,
    width: avatarWidth,
    height: avatarWidth
  }
}

class Profile extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className={classes.row}>
          <Avatar alt={profileImage} src={profileImage} className={classes.avatar} />
        </div>
        <div className={classes.row}>
          <UserMenu />
        </div>
      </React.Fragment>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
