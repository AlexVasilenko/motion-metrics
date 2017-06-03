import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

export const MobileList = ({ task }) => (
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
                    <hr />
                  </div>
                </ListItem>
              )
            })
        }
      </List>
    </div>
  </div>
)
MobileList.propTypes = {
  task: PropTypes.array,
}

export default MobileList
