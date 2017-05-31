import React from 'react'
import PropTypes from 'prop-types'
import MobileList from './../MobileList'
import DesktopList from './../DesktopList'

import styles from './styles.scss'


export const TaskList = ({ tasks, isMobile }) => (
  <div>
    {
    isMobile ? (<MobileList tasks={tasks} />) : (<DesktopList tasks={tasks} />)
    }
  </div>
)
TaskList.propTypes = {
  tasks: PropTypes.array,
  isMobile: PropTypes.bool,
}

export default TaskList
