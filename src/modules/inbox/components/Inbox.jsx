import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import DrawerOptions from './DrawerOptions'
import DrawerProfile from './DrawerProfile'
import EmailList from './EmailTable'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import { search } from '../inboxReducer'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%'
  },
  content: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  textField: {
    marginTop: theme.spacing.unit * 6,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  button: {
  }
})

class Inbox extends React.Component {
  constructor (props) {
    super()
    this.state = {
      view: props.view,
      search: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleTextChange (event) {
    let value = event.target.value
    this.setState((prevState) => ({
      ...prevState,
      search: value
    }))
  }

  handleSearch () {
    this.props.search(this.state.search, this.props.view)
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='absolute' className={classes.appBar}>
          <Toolbar>
            <Typography variant='title' color='inherit' noWrap>
              Sirena Inbox
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}>
          <div className={classes.toolbar} />
          <DrawerProfile />
          <Divider />
          <List><DrawerOptions /></List>
        </Drawer>
        <main style={{ overflowY: 'scroll', height: '100%' }} className={classes.content}>
          <Button onClick={this.handleSearch} mini variant='fab' color='primary' aria-label='Edit' className={classes.button}>
            <SearchIcon />
          </Button>
          <TextField
            id='search'
            label='Search'
            type='search'
            className={classes.textField}
            onChange={this.handleTextChange}
            margin='normal' />
          <div className={classes.toolbar} />
          <EmailList />
        </main>
      </div>)
  }
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired
}

const mapDispatch = dispatch => ({
  search: (text, view) => { dispatch(search(text, view)) }
})

const mapStateToProps = (state) => ({
  view: state.inboxReducer.view
})

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Inbox))
