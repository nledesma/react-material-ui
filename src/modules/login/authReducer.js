import axios from 'axios'
import {
  push
} from 'react-router-redux'

import api from '../../config/endpoints'
const LOGIN_EMAIL = 'LOGIN_EMAIL'
const LOGOUT = 'LOGOUT'
const LOGIN_ERROR = 'LOGIN_ERROR'
const CLEAR_ERRORS = 'CLEAR_ERRORS'

const initialState = {
  email: null,
  error: null,
  token: null,
  isAuthenticated: false
}

// Action creators
export const loginError = err => ({
  type: LOGIN_ERROR,
  err
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const loginAction = data => ({
  type: LOGIN_EMAIL,
  data
})

export const logout = () => ({
  type: LOGOUT
})

// Thunks
export const login = (email, password) => dispatch => {
  axios.post(api.login, {
    email,
    password
  })
    .then(res => {
      dispatch(loginAction({
        email,
        token: res.data.data.token
      }))
      dispatch(push('/'))
    })
    .catch(err => {
      dispatch(loginError(err))
    })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        isAuthenticated: true,
        error: null
      }
    case LOGOUT:
      return { ...state,
        email: null,
        error: null,
        isAuthenticated: false
      }
    case LOGIN_ERROR:
      return { ...state,
        error: {
          message: 'Wrong email or password. Try again'
        },
        isAuthenticated: false
      }
    case CLEAR_ERRORS:
      return { ...state,
        error: null
      }
    default:
      return state
  }
}
