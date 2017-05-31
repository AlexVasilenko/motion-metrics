import React from 'react'
import './HomeView.scss'
import Nav from './../../Counter/components/Nav'
import AppBar from './../../Counter/components/AppBar'
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
    return (<div>
      <Nav selected={selected} />
      <AppBar selected={selected} />
      <TaskList tasks={this.props.items.items} onSelect={this.props.onSelect} />
    </div>)
  }
}

export default HomeView
