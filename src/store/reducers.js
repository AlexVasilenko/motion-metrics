import { combineReducers } from 'redux'
import locationReducer from './location'
import itemsReducer from '../routes/Home/modules/items'
import formReducer from '../routes/Counter/modules/form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    items: itemsReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
