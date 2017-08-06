import React from 'react'
import './HomeView.scss'
import Nav from '../../../components/Nav'
import AppBar from '../../../components/AppBar'
import TaskList from '../../Home/components/TaskList'
import PropTypes from 'prop-types'

class HomeView extends React.Component {
  static propTypes = {
    items: PropTypes.object.isRequired,
    downloadItems: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedItems: PropTypes.number.isRequired,
    unSelect: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
  }

  constructor (props) {
    super()
    props.downloadItems()
  }

  render () {
    return (<div>
      <Nav
        selectMode={this.props.selectedItems}
        user={this.props.currentUser}
      />
      <AppBar
        selected={this.props.selectedItems}
        unselect={this.props.unSelect}
        selectedIds={this.props.selectedIds}
      />
      <TaskList
        tasks={this.props.items.items}
        onSelect={this.props.onSelect}
        selectMode={this.props.selectedItems}
      />
    </div>)
  }
}

export default HomeView
