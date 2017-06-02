import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import classNames from 'classnames'

import ContentAdd from 'material-ui/svg-icons/content/add'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Search from 'material-ui/svg-icons/action/search'
import Delete from 'material-ui/svg-icons/action/delete'
import Close from 'material-ui/svg-icons/navigation/close'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import styles from './styles.scss'


const selectAppBar = (selected, selectClass) => (
    <div className={selectClass}>
      <nav className='selection-nav '>
        <IconButton>
          <Close />
        </IconButton>
        { selected ? <span className='title '>{selected} selected</span> : ''}
        { selected === 1 ? <IconButton ><EditIcon /></IconButton> : '' }
        <IconButton>
          <Delete />
        </IconButton>
      </nav>
    </div>
)

const unselectAppBar = (selected) => (
    <div className='wrapper'>
      <nav>
        <FloatingActionButton className='fab'>
          <ContentAdd />
        </FloatingActionButton>
        <span className='title'>automated tasks</span>
        <IconButton className=' search '>
          <Search />
        </IconButton>
        <div className='inputContainer '>
          <input placeholder='Search ' />
          <md-icon>clear</md-icon>
        </div>
      </nav>
    </div>
)


export const AppBar = ({ selected, isMobile }) => {
  const selectClass = classNames({
    wrapper: true,
    'selection-mode': selected
  });

  if (selected) {
    return selectAppBar(selected, selectClass);
  }
  return unselectAppBar();
}
AppBar.propTypes = {
  selected: PropTypes.Array,
  isMobile: PropTypes.bool,
}

export default AppBar
