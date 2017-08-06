import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import classNames from 'classnames'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import Modal from '../../components/modal'

import ContentAdd from 'material-ui/svg-icons/content/add'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Close from 'material-ui/svg-icons/navigation/close'
import Search from '../../components/search'

import './styles.scss'

const selectAppBar = (selected, selectClass, unselect, onClose, onOpen, isOpen, onDelete, selectedIds) => {
  return (
    <div className={selectClass}>
      <nav className='selection-nav edit-mode'>
        <IconButton onClick={unselect}>
          <Close />
        </IconButton>
        { selected ? <span className='title'>{selected} selected</span> : ''}
        { selected === 1 ? <Link to='/edit/{selectedIds[0]}'><IconButton ><EditIcon /></IconButton></Link> : '' }
        <IconButton onClick={onOpen}>
          <Delete />
        </IconButton>
      </nav>
    </div>
  )
}

const unselectAppBar = (snack, closeSnack, editMode, textMode) => (
  <div className='wrapper'>
    <Snackbar
      open={snack.open}
      message={snack.message}
      action='undo'
      autoHideDuration={3000}
      onRequestClose={closeSnack}
    />
    <nav className='app-bar'>
      <Link to='/edit/new'>
        <FloatingActionButton className='fab' >
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      <span className='title'>{textMode} automated tasks</span>
      <Search />
    </nav>
  </div>
)


export class AppBar extends React.Component {
  static propTypes = {
    selected: PropTypes.number,
    isMobile: PropTypes.bool,
    unselect: PropTypes.func,
    editMode: PropTypes.bool,
  }

  constructor () {
    super()
    this.state = {
      isOpen: false,
      snack: {
        message: 'Task deleted',
        open: false,
      }
    }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  };

  handleClose = () => {
    this.setState({ isOpen: false })
  };

  handleDelete = () => {
    this.setState({
      isOpen: false,
    })
    this.props.unselect()
    this.snackOpen()
  };

  snackClose = () => {
    this.setState({
      snack: {
        ...this.state.snack,
        open: false
      }
    })
  }

  snackOpen = () => {
    this.setState({
      snack: {
        ...this.state.snack,
        open: true
      }
    })
  }

  render () {
    const selected = this.props.selected
    const selectClass = classNames({
      wrapper: true,
      'selection-mode': selected
    })

    if (selected) {
      return (
        <div className={selectClass}>
          <Modal
            onClose={this.handleClose}
            onDelete={this.handleDelete}
            isOpen={this.state.isOpen}
          >
            Delete this items?
          </Modal>
          <nav className='selection-nav edit-mode'>
            <IconButton onClick={this.props.unselect}>
              <Close />
            </IconButton>
            { selected ? <span className='title'>{selected} selected</span> : ''}
            { selected === 1 ? <Link to={`/edit/${this.props.selectedIds[0]}`}><IconButton ><EditIcon /></IconButton></Link> : '' }
            <IconButton onClick={this.handleOpen}>
              <Delete />
            </IconButton>
          </nav>
        </div>
      )
    }
    return unselectAppBar(
      this.state.snack,
      this.snackClose,
      this.props.editMode,
      this.props.textMode)
  }
}

export default AppBar
