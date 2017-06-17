import React from 'react'
import './HomeView.scss'
import Nav from '../../../components/Nav'
import AppBar from '../../../components/AppBar'
import Form from './Form'
import PropTypes from 'prop-types'


let selected = []

class HomeView extends React.Component {
  static propTypes = {
    selectedItems: PropTypes.func,
    user: PropTypes.object,
    unSelect: PropTypes.func,
    isEditMode: PropTypes.bool,
    form: PropTypes.object,
    newItem: PropTypes.func,
    getTimeZone: PropTypes.func,
  }

  constructor (props) {
    super()
  }

  render () {
    // что-то нужно сделать с items
    return (<div>
      <Nav selectMode={this.props.selectedItems} />
      <AppBar selected={this.props.selectedItems} unselect={this.props.unSelect} />
      <Form
        isEditMode={this.props.isEditMode}
        user={this.props.user}
        form={this.props.form}
        step={this.props.form.step}
        saveItem={this.props.newItem}
        getTimeZone={this.props.getTimeZone} />
    </div>)
  }
}

export default HomeView
