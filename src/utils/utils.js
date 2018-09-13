import store from '../app/store'

export const getConfig = (params) => ({
  params,
  headers: {
    'Authorization': store.getState().authReducer.token
  }
})
