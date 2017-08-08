import React from 'react'
import './HomeView.scss'
import Nav from '../../../components/Nav'
import AppBar from '../../../components/AppBar'
import Form from './Form'
import PropTypes from 'prop-types'

class HomeView extends React.Component {
  static propTypes = {
    selectedItems: PropTypes.func,
    user: PropTypes.object,
    unSelect: PropTypes.func,
    isEditMode: PropTypes.bool,
    form: PropTypes.object,
    newItem: PropTypes.func,
    getTimeZone: PropTypes.func,
    getSelectedItem: PropTypes.func,
    params: PropTypes.object,
    currentUser: PropTypes.object,
    uniqueName: PropTypes.string,
  }

  constructor (props) {
    super()
    this.state = {
      editItem: {}
    }

    const editId = props.params.id
    if (editId) {
      props.getSelectedItem(editId).then(this.setValue.bind(this))
    }
  }

  componentDidMount () {
    const editId = this.props.params.id
    if (editId) {
      this.props.getSelectedItem(editId).then(this.setValue.bind(this))
    }
  }

  setValue (item) {
    this.setState({
      editItem: item,
      isEditMode: true,
    })
  }

  back () {
    return () => {
      this.setState({
        editItem: { ...this.state.editItem },
      })
    }
  }

  render () {
    return (<div>
      <Nav selectMode={this.props.selectedItems} user={this.props.currentUser} />
      <AppBar
        selected={this.props.selectedItems}
        unselect={this.props.unSelect}
        editMode={this.state.isEditMode}
        textMode={this.state.isEditMode ? 'Edit' : 'Create'} />
      <Form
        isEditMode={this.state.isEditMode}
        user={this.props.user}
        form={this.props.form}
        step={this.props.form.step}
        saveItem={this.props.newItem}
        getTimeZone={this.props.getTimeZone}
        uniqueName={this.props.uniqueName}
        editItem={this.state.editItem}
        back={this.back()} />
    </div>)
  }
}

export default HomeView
