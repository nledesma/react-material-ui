/* Dependencies */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

/* Import Other Reducers */
import authReducer from '../modules/login/authReducer'

/* Combine & Export Reducers to Store */
const appReducer = combineReducers({
  authReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer