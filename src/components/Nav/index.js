import React from 'react'
import PropTypes from 'prop-types'
/* icons */
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import Settings from 'material-ui/svg-icons/action/settings'
import Feedback from 'material-ui/svg-icons/action/feedback'
import VerifiedUser from 'material-ui/svg-icons/action/verified-user'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import classNames from 'classnames'

import './styles.scss'


export const Nav = ({ selectMode, user }) => {
  const selectClass = classNames({
    nav: true,
    'edit-mode': selectMode,
  })
  return (
    <nav className={selectClass} >
      <div className='logo'>Logo</div>
      <span className='title'>Admin</span>
      <span className='username'>{ user }&nbsp;{ user }</span>
      <div className='initials'>{ user }{ user }</div>

      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem primaryText='Account Info' leftIcon={<AccountCircle />} />
        <MenuItem primaryText='Settings' leftIcon={<Settings />} />
        <MenuItem primaryText='Feedback' leftIcon={<Feedback />} />
        <MenuItem primaryText='Administration' leftIcon={<VerifiedUser />} />
        <MenuItem primaryText='Sign out' leftIcon={<ExitToApp />} />
      </IconMenu>
    </nav>
  )
}
Nav.propTypes = {
  user: PropTypes.object,
  isEditMode: PropTypes.bool,
  selectMode: PropTypes.bool,
}

export default Nav
