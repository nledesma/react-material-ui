import axios from 'axios'
import { push } from 'react-router-redux'

import api from '../../config/endpoints'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOGIN_ERROR = 'LOGIN_ERROR'
const CLEAR_ERRORS = 'CLEAR_ERRORS'

const initialState = {
  email: null,
  error: null,
  token: null,
  isAuthenticated: false,
}

export const loginError = err => ({
  type: LOGIN_ERROR, err
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

// normal action creators
export const loginAction = data => ({
  type: LOGIN, data
})

export const logout = () => ({
  type: LOGIN_EMAIL
})

// thunks
export const login = (email, password) => dispatch => {
  axios.post(api.login, { email, password })
    .then(res => {
      dispatch(loginAction({email, token: res.data.data.token}))
      dispatch(push('/'))
    })
    .catch(err => {
      dispatch(loginError(err))
    })
}

export const logoutUser = () => dispatch => {
  dispatch(logout())
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    console.log(action)
    return {
      ...state,
      email: action.data.email,
      token: action.data.token,
      isAuthenticated: true,
      error: null
    }
  case LOGOUT:
    return { ...state, email: null, error: null, isAuthenticated: false }
  case LOGIN_ERROR:
    return { ...state, error: { message: 'Wrong email or password. Try again' }, isAuthenticated: false }
  case CLEAR_ERRORS:
    return { ...state, error: null }
  default:
    return state
  }
}
