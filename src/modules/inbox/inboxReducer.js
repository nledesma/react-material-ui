import axios from 'axios'
import { getConfig } from '../../utils/utils'

import api from '../../config/endpoints'

import { views } from '../inbox/components/DrawerOptions'
const UPDATE_EMAILS = 'UPDATE_EMAILS'
const UPDATE_SEARCHES = 'UPDATE_SEARCHES'
const SET_VIEW = 'SET_VIEW'

const initialState = {
  view: views.inbox,
  emails: [],
  searches: []
}

// Action creators
export const updateEmails = emails => ({
  type: UPDATE_EMAILS,
  data: emails
})

export const updateSearches = searches => ({
  type: UPDATE_SEARCHES,
  data: searches
})

export const setView = view => ({
  type: SET_VIEW,
  data: view
})

// thunks

export const search = (text, view) => async dispatch => {
  if (text && text.trim() !== '') {
    if (view === views.inbox) {
      dispatch(getInbox(text))
    } else if (view === views.sent) {
      dispatch(getSent(text))
    } else {
      dispatch(getDrafts(text))
    }
  }
}

export const getInbox = (search) => async dispatch => {
  console.log('GOT CALLED')
  const emails = await axios.get(api.inbox, getConfig({ search: search }))
  dispatch(updateEmails(emails.data.data.received))
  dispatch(setView(views.inbox))
}

export const getDrafts = (search) => async dispatch => {
  const emails = await axios.get(api.draft, getConfig({ params: search }))
  dispatch(updateEmails(emails.data.data.drafts))
  dispatch(setView(views.draft))
}

export const getSent = (search) => async dispatch => {
  const emails = await axios.get(api.sent, getConfig({ params: search }))
  dispatch(updateEmails(emails.data.data.sent))
  dispatch(setView(views.sent))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMAILS:
      return {
        ...state,
        emails: action.data
      }
    case UPDATE_SEARCHES:
      return { ...state,
        searches: action.data
      }
    case SET_VIEW:
      return { ...state,
        view: action.data
      }
    default:
      return state
  }
}
