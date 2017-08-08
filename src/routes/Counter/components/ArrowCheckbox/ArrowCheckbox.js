import React from 'react'
import './HomeView.scss'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

class ArrowCheckbox extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
    onCheck: PropTypes.bool,
    label: PropTypes.string,
  }

  constructor (props) {
    super()
    this.state = {
      value: props.value,
      display: !!props.value,
    }
  }

  onClick () {
    return () => {
      if (this.state.display) {
        this.props.onCheck()
      }
    }
  }

  render () {
    return (<div>
      <div className='form-control checkbox-wrapper'>
        <Checkbox label={this.props.label} />
        <ArrowDropDown onClick={this.onClick()} />
      </div>
    </div>)
  }
}

export default ArrowCheckbox
