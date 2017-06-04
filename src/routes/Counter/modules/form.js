import getAllList from '../../../api/index'

export const DOWNLOADING_ITEMS = 'DOWNLOAD LIST ELEMENTS'
export const DOWNLOADED_ITEMS = 'DOWNLOADED LIST ELEMENTS'
export const DOWNLOAD_ITEMS_ERROR = 'DOWNLOAD LIST ELEMENTS ERROR'
export const UNSELECT_ALL_ITEMS = 'UNSELECT ALL ITEMS IN THE LIST'

export const SELECT_ITEMS = 'SELECT ITEM'

import newItem from '../../../routes/Home/modules/items'



export const actions = {
  newItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

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
  }
}
export default function formReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

