import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


export const Modal = ({onClose, onDelete, isOpen, children}) => {
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
        <Dialog
        actions={actions}
        modal={false}
        open={isOpen}
        onRequestClose={onClose}
        >
          {children}
        </Dialog>
        )
}


export default Modal
