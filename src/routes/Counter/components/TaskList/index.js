import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import styles from './styles.scss'


export const TaskList = ({ task }) => (
  <div className='container'>
  <div className='mobile-container '>
    <List className='mobile-list '>
      {
        task.map((task1, i) => {
          return (
            <ListItem className=' item ' key={i}
              leftAvatar={
                <Avatar className='avatar' />
            }>
              <div className='text '>
                <h3>{ task1.title }</h3>
                <p className='timezone '>{ task1.timeZone }</p>
                <p className='datetime '>
                  <span className='time '>{ task1.reportTime.toString() }</span>
                  <span className='date '>{ task1.repeat }</span>
                </p>
                <hr/>
               </div>
            </ListItem>
          );
        })
      }
    </List>
  </div>
  <div className='desktop-container '>
    <div className='headers '>
      <div className='col-avatar '></div>
      <div className='col-title with-border '>Task Title</div>
      <div className='col-timezone with-border '>Time Zone</div>
      <div className='col-time with-border '>Report Time</div>
      <div className='col-repeat with-border '>Repeat</div>
    </div>
    <List className='desktop-list '>
      <ListItem className='item '>
        <div className='item-wrapper '>
          <Avatar className='avatar col-avatar '></Avatar>
          <div className='col-title text '>{ task.title }</div>
          <div className='col-timezone '>{ task.timeZone }</div>
          <div className='col-time '>{ task.reportTime }</div>
          <div className='col-repeat '>{ task.repeat }</div>
        </div>
      </ListItem>
    </List>
  </div>
</div>
)
TaskList.propTypes = {
  task: PropTypes.array,
}

export default TaskList
