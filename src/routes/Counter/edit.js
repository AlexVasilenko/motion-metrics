import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/edit/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter1 = require('./containers/HomeContainer').default
      const reducer1 = require('./modules/form').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counter', reducer1 })

      /*  Return getComponent   */
      cb(null, Counter1)

    /* Webpack named bundle   */
    }, 'edit')
  }
})
