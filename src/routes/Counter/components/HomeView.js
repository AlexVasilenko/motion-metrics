import React from 'react'
import './HomeView.scss'
import Nav from '../../../components/Nav'
import AppBar from '../../../components/AppBar'
import Form from './Form'
import PropTypes from 'prop-types'

let selected = []

class HomeView extends React.Component {
  static propTypes = {

  }

  constructor (props) {
    super()
    props.downloadItems()
  }

  render () {
    // что-то нужно сделать с items
    debugger;
    return (<div>
      <Nav selectMode={this.props.selectedItems} />
      <AppBar selected={this.props.selectedItems} unselect={this.props.unSelect} />
      <Form isEditMode={this.props.isEditMode} user={this.props.user} form={this.props.form}/>
    </div>)
  }
}

export default HomeView
