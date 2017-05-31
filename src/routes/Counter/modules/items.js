import getAllList from './../../../api/index'

export const DOWNLOADING_ITEMS = 'DOWNLOAD LIST ELEMENTS'
export const DOWNLOADED_ITEMS = 'DOWNLOADED LIST ELEMENTS'
export const DOWNLOAD_ITEMS_ERROR = 'DOWNLOAD LIST ELEMENTS ERROR'

export function download () {
  return {
    type    : DOWNLOADING_ITEMS,
  }
}

debugger

export const downloadItems = () => {
  return (dispatch, getState) => {
    debugger
    return new Promise((resolve) => {
      debugger
      setTimeout(() => {
        debugger;
        dispatch({
          type    : DOWNLOADED_ITEMS,
          payload : getAllList()
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  downloadItems
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DOWNLOADING_ITEMS]   : (state, action) => !state.loading,
  [DOWNLOADED_ITEMS]    : (state, action) => {
    debugger
    return ({
      loading: false,
      items: action.payload,
    })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  items: [],
}
export default function itemsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  debugger

  return handler ? handler(state, action) : state
}

