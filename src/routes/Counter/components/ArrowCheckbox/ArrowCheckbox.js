import React from 'react'
import './HomeView.scss'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

class ArrowCheckbox extends React.Component {
  static propTypes = {

  }

  constructor (props) {
    super()
    this.state = {
      value: props.value,
      display: !!props.value,
    }
  }

  onClick() {
    if (this.state.display) {
      this.props.onCheck()
    }
  }

  render () {
    return (<div>
      <div className='form-control checkbox-wrapper'>
        <Checkbox label={this.props.label} />
        <ArrowDropDown onClick={this.onClick.bind(this)} />
      </div>
    </div>)
  }
}

export default ArrowCheckbox
