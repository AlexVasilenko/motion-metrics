import { connect } from 'react-redux'
import { actions } from '../modules/items'
import { createSelector } from 'reselect'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import HomeView from './../components/HomeView.js'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = actions

const selectFn = (state) => state.items.items.filter((item) => item.select).length

const selectedCount = createSelector(selectFn, (count) => count)

const getIds = (state) => state.items.items.filter((item) => item.select).map(select => select.id)

const selectIds = createSelector(getIds, (ids) => ids)

const sortFunction = (state) => {
  state.items.items.sort((first, second) => {
    if (first.title < second.title) return -1
    if (first.title > second.title) return 1
    return 0
  })
  return state.items
}

const sortElements = createSelector(sortFunction, (items) => items)

const mapStateToProps = (state) => ({
  items : sortElements(state),
  selectedItems: selectedCount(state),
  currentUser: state.items.currentUser,
  selectedIds: selectIds(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
