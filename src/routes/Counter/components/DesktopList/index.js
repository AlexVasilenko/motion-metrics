import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'


export const DesktopList = ({ tasks }) => (
  <div className='desktop-container '>
    <div className='headers '>
      <div className='col-avatar '></div>
      <div className='col-title with-border '>Task Title</div>
      <div className='col-timezone with-border '>Time Zone</div>
      <div className='col-time with-border '>Report Time</div>
      <div className='col-repeat with-border '>Repeat</div>
    </div>
    <List className='desktop-list '>
      { tasks.map((task1, i) => {
        return (
          <ListItem className='item '>
            <div className='item-wrapper '>
              <Avatar className='avatar col-avatar '></Avatar>
              <div className='col-title text '>{ task1.title }</div>
              <div className='col-timezone '>{ task1.timeZone }</div>
              <div className='col-time '>{ task1.reportTime.toString() }</div>
              <div className='col-repeat '>{ task1.repeat }</div>
            </div>
          </ListItem>)
      }) }
    </List>
  </div>
)
DesktopList.propTypes = {
  tasks: PropTypes.array,
}

export default DesktopList
