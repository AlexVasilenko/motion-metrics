import React from 'react'
import './HomeView.scss'
import Nav from '../../../components/Nav'
import AppBar from '../../../components/AppBar'
import TaskList from './../../Counter/components/TaskList'
import PropTypes from 'prop-types'


let selected = []

class HomeView extends React.Component {
  static propTypes = {
    items: PropTypes.object.isRequired,
    downloadItems: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor (props) {
    super()
    props.downloadItems()
  }

  render () {
    // что-то нужно сделать с items
    return (<div>
      <Nav selectMode={this.props.selectedItems} />
      <AppBar selected={this.props.selectedItems} unselect={this.props.unSelect} />
      <TaskList tasks={this.props.items.items} onSelect={this.props.onSelect} />
    </div>)
  }
}

export default HomeView
