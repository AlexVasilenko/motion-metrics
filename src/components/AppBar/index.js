import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import classNames from 'classnames'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import ContentAdd from 'material-ui/svg-icons/content/add'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Search from 'material-ui/svg-icons/action/search'
import Delete from 'material-ui/svg-icons/action/delete'
import Close from 'material-ui/svg-icons/navigation/close'

import './styles.scss'

const selectAppBar = (selected, selectClass, unselect, onClose, onOpen, isOpen, onDelete) => {
  const actions = [
    <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={onClose}
    />,
    <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={onDelete}
    />,
  ]
  return (
      <div className={selectClass}>
        <Dialog
            actions={actions}
            modal={false}
            open={isOpen}
            onRequestClose={onClose}
        >
          Delete selected tasks?
        </Dialog>
        <nav className='selection-nav edit-mode'>
          <IconButton onClick={unselect}>
            <Close />
          </IconButton>
          { selected ? <span className='title'>{selected} selected</span> : ''}
          { selected === 1 ? <IconButton ><EditIcon /></IconButton> : '' }
          <IconButton onClick={onOpen}>
            <Delete />
          </IconButton>
        </nav>
      </div>
  )
}

const unselectAppBar = (snack, closeSnack) => (
    <div className='wrapper'>
      <Snackbar
          open={snack.open}
          message={snack.message}
          action="undo"
          autoHideDuration={3000}
          onRequestClose={closeSnack}
      />
      <nav className="app-bar">
        <FloatingActionButton className='fab'>
          <ContentAdd />
        </FloatingActionButton>
        <span className='title'>automated tasks</span>
        <IconButton className=' search '>
          <Search />
        </IconButton>
      </nav>
    </div>
)


export class AppBar extends React.Component {
  static propTypes = {
    selected: PropTypes.Array,
    isMobile: PropTypes.bool,
  }

  constructor() {
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
    this.setState({isOpen: true});
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleDelete = () => {
    this.setState({
      isOpen: false,
    });
    this.props.unselect();
    this.snackOpen();
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

  render() {
    // refactor modal
    const selected = this.props.selected;
    const selectClass = classNames({
      wrapper: true,
      'selection-mode': selected
    });

    if (selected) {
      return selectAppBar(selected, selectClass, this.props.unselect, this.handleClose, this.handleOpen, this.state.isOpen, this.handleDelete);
    }
    return unselectAppBar(this.state.snack, this.snackClose);
  }
}


export default AppBar
