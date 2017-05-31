import getAllList from './../../../api/index'

export const DOWNLOADING_ITEMS = 'DOWNLOAD LIST ELEMENTS'
export const DOWNLOADED_ITEMS = 'DOWNLOADED LIST ELEMENTS'
export const DOWNLOAD_ITEMS_ERROR = 'DOWNLOAD LIST ELEMENTS ERROR'

export const SELECT_ITEMS = 'SELECT ITEM'

export function onSelect (id) {
  return {
    type    : SELECT_ITEMS,
    payload : id
  }
}

export const downloadItems = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
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
  downloadItems,
  onSelect
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DOWNLOADING_ITEMS]   : (state, action) => !state.loading,
  [DOWNLOADED_ITEMS]    : (state, action) => ({
    loading: false,
    items: action.payload,
  }),
  [SELECT_ITEMS]        : (state, action) => {
    let selectItem = state.items.find((item) => item.id === action.payload)

    selectItem.select = true
    return {
      ...state.items,
    }
  }
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

  return handler ? handler(state, action) : state
}

