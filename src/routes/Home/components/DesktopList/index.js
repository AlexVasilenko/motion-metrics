import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import classNames from 'classnames'
import { repeatGenerate } from '../../../../helpers/listHelper'

const DesktopList = ({ tasks,  onSelect }) => (
  <div className='desktop-container '>
    <div className='headers '>
      <div className='col-avatar '></div>
      <div className='col-title with-border '>Task Title</div>
      <div className='col-timezone with-border '>Time Zone</div>
      <div className='col-time with-border '>Report Time</div>
      <div className='col-repeat with-border '>Repeat</div>
    </div>
    <List className='desktop-list '>
      { tasks.map((task, i) => {
        const selectClass = classNames({
          item: true,
          selected: task.select
        })
        return (
          <ListItem className={selectClass} onClick={onSelect.bind(this, task.id)} key={i}>
            <div className='item-wrapper '>
              <Avatar className='avatar col-avatar ' />
              <div className='col-title text '>{ task.title }</div>
              <div className='col-timezone '>{ task.timeZone }</div>
              <div className='col-time '>{ task.reportTime.toString() }</div>
              <div className='col-repeat '>{ repeatGenerate(task.repeat) }</div>
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
