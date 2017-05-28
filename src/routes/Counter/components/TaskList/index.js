import React from 'react'
import PropTypes from 'prop-types'
import MobileList from './../MobileList'
import DesktopList from './../DesktopList'

import styles from './styles.scss'


export const TaskList = ({ task, isMobile }) => (
  <div>
    {
    isMobile ? (<MobileList task={task} />) : (<DesktopList task={task} />)
    }
  </div>
)
TaskList.propTypes = {
  task: PropTypes.array,
  isMobile: PropTypes.bool,
}

export default TaskList
