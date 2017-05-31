import React from 'react'
import PropTypes from 'prop-types'
import MobileList from './../MobileList'
import DesktopList from './../DesktopList'

import styles from './styles.scss'


export const TaskList = ({ tasks, isMobile, onSelect }) => (
  <div>
    {
    isMobile ? (<MobileList tasks={tasks} onSelectElement={onSelect} />) : (<DesktopList tasks={tasks} />)
    }
  </div>
)
TaskList.propTypes = {
  tasks: PropTypes.array,
  isMobile: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

export default TaskList
