import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Search from 'material-ui/svg-icons/action/search'

import './styles.scss'

export class SearchComponent extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool,
  }

  constructor () {
    super()
    this.state = {
      show: false,
    }
  }

  toggle () {
    return () => {
      this.setState({
        show: !this.state.show,
      })
    }
  }

  toggleComponent () {
    return (
     this.state.show ? <TextField id='searchField' className='searchInput' /> : ''
    )
  }

  render () {
    return (
      <nav className='app-bar'>
        <IconButton className='search' onClick={this.toggle()}>
          <Search color='white' />
        </IconButton>
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={10}
          transitionLeaveTimeout={10}>
          { this.toggleComponent() }
        </ReactCSSTransitionGroup>
      </nav>
    )
  }
}

export default SearchComponent
