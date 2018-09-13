import React from 'react'
import { connect } from 'react-redux'
import { login } from './authReducer'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    height: '100%',
    color: theme.palette.text.secondary
  }
})

export class Login extends React.Component {
  constructor (props) {
    super()
  }

  valida () {
    let render = []
    if (this.props.errorMessage) {
      render = <div>some error</div>
    }
    return render
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid style={{ height: 400, margin: 'auto', verticalAlign: 'middle' }} container spacing={24} justify='center' alignItems='center'>
          <Grid item xs={4}>
            <Typography variant='display1' gutterBottom>
              Login
            </Typography>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete='off' onSubmit={event => {
                event.preventDefault()
                this.props.login(event.target.email.value, event.target.password.value)
              }}>
                <Grid item xs={12}>
                  <TextField id='full-width' name='email' label='Email' InputLabelProps={{ shrink: true }} placeholder='example@mail.com' fullWidth />
                  <TextField id='password-input' label='Password' name='password' type='password' autoComplete='current-password' fullWidth margin='normal' />
                  <Button type='submit' variant='contained' color='primary'>
                    Continue
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

const mapDispatch = (dispatch) => ({
  login: (email, password) => {
    dispatch(login(email, password))
  }
})

const mapStateToProps = (state) => {
  return {
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Login))
