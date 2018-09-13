import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Checkbox from '@material-ui/core/Checkbox'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
})

class TablePaginationActions extends React.Component {
  constructor () {
    super()
    this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this)
    this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this)
  }

  handleFirstPageButtonClick (event) {
    this.props.onChangePage(event, 0)
  }

  handleBackButtonClick (event) {
    this.props.onChangePage(event, this.props.page - 1)
  }

  handleNextButtonClick (event) {
    this.props.onChangePage(event, this.props.page + 1)
  }

  handleLastPageButtonClick (event) {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    )
  }

  render () {
    const { classes, count, page, rowsPerPage, theme } = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='First Page'
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label='Previous Page'
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='Next Page'
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='Last Page'
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions
)

const styles = theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto',
    width: '100%'
  },
  checkbox: {
    width: '40px'
  },
  summary: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    maxHeight: '40px'
  },
  name: {
    width: '80px'
  }
})

class EmailList extends React.Component {
  constructor (props) {
    super()
    this.state = {
      rows: props.emails,
      view: props.view,
      page: 0,
      rowsPerPage: 20
    }
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  }

  handleChangePage (event, page) {
    this.setState({ page })
  }

  handleChangeRowsPerPage (event) {
    this.setState({ rowsPerPage: event.target.value })
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.emails) {
      prevState.rows = nextProps.emails
    }
    if (nextProps.view !== prevState.view) {
      prevState.page = 0
      prevState.view = nextProps.view
    }
    return prevState
  }

  render () {
    const { classes } = this.props
    const { rows, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell className={classes.checkbox} padding='checkbox' component='th' scope='row'>
                      <Checkbox
                        checked={false}
                        onChange={() => console.log('clicked')}
                        value='checked'
                        color='primary'
                        style={{width: '20px'}}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className={classes.name} color='inherit' noWrap>{`${row.firstName} ${row.lastName}`}</Typography>
                    </TableCell>
                    <TableCell className={classes.summary}>
                      <Typography variant='body2' color='inherit'>{row.subject}</Typography>
                      <Typography className={classes.summary} color='inherit' noWrap>{row.message}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                  rowsPerPageOptions={[]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

EmailList.propTypes = {
  classes: PropTypes.object.isRequired,
  emails: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  emails: state.inboxReducer.emails,
  view: state.inboxReducer.view
})

export default connect(mapStateToProps, null)(withStyles(styles)(EmailList))
