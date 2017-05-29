export const DOWNLOADING_ITEMS = 'DOWNLOAD LIST ELEMENTS'
export const DOWNLOADED_ITEMS = 'DOWNLOADED LIST ELEMENTS'
export const DOWNLOAD_ITEMS_ERROR = 'DOWNLOAD LIST ELEMENTS ERROR'

export function download () {
  return {
    type    : DOWNLOADING_ITEMS,
  }
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : DOWNLOADED_ITEMS,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}
