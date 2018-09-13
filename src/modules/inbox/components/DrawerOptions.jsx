import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import { getInbox, getSent, getDrafts } from '../inboxReducer'

export const views = {
  inbox: 'Inbox',
  draft: 'Draft',
  sent: 'Sent'
}

class DrawerOptions extends React.Component {
  constructor (props) {
    super()

    this.handleClickInbox = this.handleClickInbox.bind(this)
    this.handleClickSent = this.handleClickSent.bind(this)
    this.handleClickDraft = this.handleClickDraft.bind(this)
  }

  handleClickInbox () {
    this.props.getInbox()
  }

  handleClickSent () {
    this.props.getSent()
  }

  handleClickDraft () {
    this.props.getDrafts()
  }

  render () {
    return (
      <React.Fragment>
        <ListItem selected={(this.props.activeView === views.inbox)} onClick={this.handleClickInbox} button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary='Inbox' />
        </ListItem>
        <ListItem selected={(this.props.activeView === views.draft)} onClick={this.handleClickDraft} button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary='Drafts' />
        </ListItem>
        <ListItem selected={(this.props.activeView === views.sent)} onClick={this.handleClickSent} button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary='Sent' />
        </ListItem>
      </React.Fragment>
    )
  }
}

DrawerOptions.propTypes = {
  activeView: PropTypes.string.isRequired,
  getDrafts: PropTypes.func.isRequired,
  getInbox: PropTypes.func.isRequired,
  getSent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  activeView: state.inboxReducer.view
})

const mapDispatch = dispatch => ({
  getInbox: () => { dispatch(getInbox()) },
  getDrafts: () => { dispatch(getDrafts()) },
  getSent: () => { dispatch(getSent()) }
})

export default connect(mapStateToProps, mapDispatch)(DrawerOptions)
