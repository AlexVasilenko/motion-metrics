import getAllList from './../../../api/index'

export const DOWNLOADING_ITEMS = 'DOWNLOAD LIST ELEMENTS'
export const DOWNLOADED_ITEMS = 'DOWNLOADED LIST ELEMENTS'
export const DOWNLOAD_ITEMS_ERROR = 'DOWNLOAD LIST ELEMENTS ERROR'
export const UNSELECT_ALL_ITEMS = 'UNSELECT ALL ITEMS IN THE LIST'

export const SELECT_ITEMS = 'SELECT ITEM'

export function onSelect (id) {
  return {
    type    : SELECT_ITEMS,
    payload : id
  }
}

export function unSelect () {
  return {
    type: UNSELECT_ALL_ITEMS
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
  onSelect,
  unSelect
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

    selectItem.select = !selectItem.select
    return {
      ...state,
    }
  },
  [UNSELECT_ALL_ITEMS]  : (state) => {
    state.items.map((item) => {
     item.select = false;
     return item;
    })

    return {
        ...state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  items: [],
  selectedItems: 0
}
export default function itemsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

