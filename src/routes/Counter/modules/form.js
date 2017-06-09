import getAllList from '../../../api/index'

import { getTimeZoneByName } from '../../../api/index'

export const DOWNLOADING_ITEMS = 'DOWNLOAD LIST ELEMENTS'
export const DOWNLOADED_ITEMS = 'DOWNLOADED LIST ELEMENTS'
export const DOWNLOAD_ITEMS_ERROR = 'DOWNLOAD LIST ELEMENTS ERROR'
export const UNSELECT_ALL_ITEMS = 'UNSELECT ALL ITEMS IN THE LIST'

export const DOWNLOADED_TIMEZONES = 'DOWNLOADED TIMEZONES'

import newItem from '../../../routes/Home/modules/items'


const getTimeZone = (name) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getTimeZoneByName(name).then((timeZones) => {
        dispatch({
          type    : DOWNLOADED_TIMEZONES,
          payload : timeZones
        })
        resolve()
      })
    })
  }
}

export const actions = {
  newItem,
  getTimeZone
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DOWNLOADED_TIMEZONES]: (state, action) => ({
    ...state,
    form: {
      ...state.form,
      timeZones: action.payload
    }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isEditMode: false,
  user: {},
  form: {
    step: 1,
    enabled: false,
    timeZones: [],
  }
}
export default function formReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

