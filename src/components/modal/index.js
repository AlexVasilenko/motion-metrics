import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export const Modal = ({ onClose, onDelete, isOpen, children }) => {
  const actions = [
    <FlatButton
      label='Cancel'
      primary
      onTouchTap={onClose}
    />,
    <FlatButton
      label='Delete'
      primary
      onTouchTap={onDelete}
    />,
  ]
  return (
    <Dialog
      actions={actions}
      modal
      open={isOpen}
      onRequestClose={onClose}
    >
      {children}
    </Dialog>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  isOpen: PropTypes.bool,
  // fix me
  children: PropTypes.any,
}

export default Modal
