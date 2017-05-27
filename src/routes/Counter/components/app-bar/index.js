import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import ContentAdd from 'material-ui/svg-icons/content/add'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Search from 'material-ui/svg-icons/action/search'
import Delete from 'material-ui/svg-icons/action/delete'
import Close from 'material-ui/svg-icons/navigation/close'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import styles from './styles.scss'


export const AppBar = ({ selected }) => (
  <div className='wrapper'>
    <nav>
      <FloatingActionButton className='fab'>
        <ContentAdd />
      </FloatingActionButton>
      <IconButton>
        <ArrowBack />
      </IconButton>
      <span className='title'>automated tasks</span>
      <IconButton className=' search '>
        <Search />
      </IconButton>
      <div className='inputContainer '>
        <input placeholder='Search ' />
        <md-icon>clear</md-icon>
      </div>
    </nav>
    <nav className='selection-nav '>
      <IconButton>
        <Close />
      </IconButton>
      <span className='title '>1 selected</span>
      <IconButton >
        <EditIcon />
      </IconButton>
      <IconButton>
        <Delete />
      </IconButton>
    </nav>
  </div>
)
AppBar.propTypes = {
    selected: PropTypes.Array,
}

export default AppBar
