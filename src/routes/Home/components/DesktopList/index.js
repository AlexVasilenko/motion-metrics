import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import classNames from 'classnames'
import { repeatGenerate } from '../../../../helpers/listHelper'
import { blue500 } from 'material-ui/styles/colors'

import Done from 'material-ui/svg-icons/action/done'

import './styles.scss'

const DesktopList = ({ tasks,  onSelect, editMode }) => (
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
          selected: task.select,
          disabled: !task.enabled,
        })
        const avatarClasses = classNames({
          avatar: true,
          'col-avatar': true,
          'select-mode': editMode,
          'select-avatar': task.select,
        })
        return (
          <ListItem className={selectClass} onClick={onSelect.bind(this, task.id)} key={i}>
            <div className='item-wrapper '>
              <Avatar
                className={avatarClasses}
                style={{ backgroundColor: 'rgb(197, 206, 255)' }}
                icon={task.select ? <Done style={{ fill: blue500 }} /> : ''}
              >
              { task.select ? '' : <span className='unselectAvatar'>PLM</span> }
              </Avatar>

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
  tasks: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  editMode: PropTypes.number.isRequired,
}

export default DesktopList
