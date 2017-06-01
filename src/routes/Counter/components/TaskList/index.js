import React from 'react'
import PropTypes from 'prop-types'
import MobileList from './../MobileList'
import DesktopList from './../DesktopList'

import styles from './styles.scss'


export const TaskList = ({ tasks, isMobile, onSelect }) => (
  <div>
    {
        // не нравиться что передаю функцию но не использую в компоненте
    isMobile ? (<MobileList tasks={tasks} onSelect={onSelect} />) : (<DesktopList tasks={tasks} onSelect={onSelect} />)
    }
  </div>
)
TaskList.propTypes = {
  tasks: PropTypes.array,
  isMobile: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

export default TaskList
