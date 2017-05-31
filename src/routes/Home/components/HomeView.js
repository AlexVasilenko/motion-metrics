import React from 'react'
import './HomeView.scss'
import Nav from './../../Counter/components/Nav'
import AppBar from './../../Counter/components/AppBar'
import TaskList from './../../Counter/components/TaskList'


let selected = []

class HomeView extends React.Component {
  constructor (props) {
    super()
    props.downloadItems()
    debugger
  }

  render () {
    debugger
    return (<div>
      <Nav selected={selected} />
      <AppBar selected={selected} />
      <TaskList tasks={this.props.items.items.length ? this.props.items.items : []} />
    </div>)
  }
}

export default HomeView
