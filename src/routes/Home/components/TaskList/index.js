import React from 'react'
import PropTypes from 'prop-types'
import MobileList from './../MobileList'
import DesktopList from './../DesktopList'

import styles from './styles.scss'

export const TaskList = ({
   tasks,
   isMobile,
   onSelect,
   selectMode
     }) => (
       <div>
         {
         isMobile ? (
           <MobileList
             tasks={tasks}
             onSelect={onSelect}
             editMode={selectMode}
           />)
           : (
             <DesktopList
               tasks={tasks}
               onSelect={onSelect}
               editMode={selectMode}
             />
              )
         }
       </div>
)
TaskList.propTypes = {
  tasks: PropTypes.array,
  isMobile: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  selectMode: PropTypes.number.isRequired,
}

export default TaskList
