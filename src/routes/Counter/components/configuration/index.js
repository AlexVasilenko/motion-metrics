import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
/* icons */
import Devices from 'material-ui/svg-icons/device/devices'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

import './styles.scss'

class Configuration extends React.Component {
  PropTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  constructor () {
    super()
    this.state = {
      unit: '',
      select: {
        productivity: false,
        timeUsage: false,
        passBucket: false,
        backetDistribution: false,
      },
      open: {
        productivity: false,
        timeUsage: false,
        passBucket: false,
        backetDistribution: false,
      }
    }
  }

  validate (values) {
    let findError = false
    const roles = {
      required: {
        fn: (value) => !!value.length,
        text: 'This is required',
        fields: ['title', 'monitoringReport', 'repeat']
      },
    }

    const errors = {}

    for (let value in values) {
      for (let validate in roles) {
        if (roles[validate].fields.indexOf(value) !== -1) {
          if (!roles[validate].fn(values[value]) && !errors[value]) {
            errors[value] = roles[validate].text
            findError = true
          }
        }
      }
    }

    if (findError) {
      return errors
    }
    return false
  }

  submitHandle () {
    return () => {
      const validateValues = {
        unit: this.state.unit,
      }
      const errors = this.validate(validateValues)
      if (errors) {
        this.setState({
          errors,
        })
      } else {
        const values = {
          enabled: this.state.enabled,
          ...validateValues,
        }
        this.props.onSubmit('generalSetting', values)
      }
    }
  }

  openModal (name) {
    return () => {
      if (this.state.select[name]) {
        this.setState({
          open: {
            ...this.state.open,
            [name]: true,
          }
        })
      }
    }
  }

  generateClasses (name) {
    return classNames({
      'form-control': true,
      'checkbox-wrapper': true,
      'disabled': !this.state.select[name]
    })
  }

  onCheck (name) {
    return () => {
      this.setState({
        select: {
          ...this.state.select,
          [name]: !this.state.select[name],
        }
      })
    }
  }

  actions = [
    <FlatButton
      label="Ok"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleClose}
    />,
  ]

  productivityPopup () {
    return (
      <Dialog
        title='Productivity'
        actions={this.actions}
        modal={false}
        open={this.state.open.productivity}
        onRequestClose={this.handleClose}
      >
        <input type='number' min='0.1' max='99.999' step='0.001' />
      </Dialog>
    )
  }

  timeUsage () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.actions}
        modal={false}
        open={this.state.open.timeUsage}
        onRequestClose={this.handleClose}
      >
        <input type='number' min='60' max='9999' step='1' />
      </Dialog>
    )
  }

  passBucket () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.actions}
        modal={false}
        open={this.state.open.passBucket}
        onRequestClose={this.handleClose}
      >
        <input type='number' min='0' max='100' step='1' />
        <Toggle
          label='Show Moving Average'
          ref={(showMoving) => this.showMoving = showMoving}
        />
        <Toggle
          label='Show Shift Colors'
          ref={(showShift) => this.showShift = showShift}
        />
      </Dialog>
    )
  }

  backetDistribution () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.actions}
        modal={false}
        open={this.state.open.backetDistribution}
        onRequestClose={this.handleClose}
      >
        <Toggle
          label='Separate By Shifts'
          ref={(separateShifts) => this.separateShifts = separateShifts}
        />
      </Dialog>
    )
  }

  render () {
    return (
        <div className='container'>

          <div className='step'>
            <form className='general' action='#' noValidate>
              <h1>Configuration</h1>
              <div className='form-control focusable-icon'>
                <Devices />
                <TextField
                hintText='Equipment'
                name='equipment'
                ref={(equipment) => this.equipment = equipment}
              /><br />
              </div>
              <div className='form-control focusable-icon'>
                <div className='form-control-main select-wrapper'>
                  <LinearScale />
                  <SelectField 
                    placeholder='Unit System Setting'
                    name='type'
                  >
                    <MenuItem value={'m kg s'} primaryText='m kg s' />
                    <MenuItem value={'cm kg s'} primaryText='cm kg s' />
                    <MenuItem value={'mm g s'} primaryText='mm g s' />
                    <MenuItem value={'in lb s'} primaryText='in lb s' />
                  </SelectField>
                  <div>This is required.</div>
                </div>
              </div>
              <h2>Report Components</h2>
              <div className='configuration'>
                <div className={this.generateClasses('productivity')}>
                  <Checkbox label='Productivity' onCheck={this.onCheck('productivity')} />
                  <ArrowDropDown onClick={this.openModal('productivity')} />
                </div>
                <div className={this.generateClasses('timeUsage')}>
                  <Checkbox label='Time Usage' onCheck={this.onCheck('timeUsage')} />
                  <ArrowDropDown onClick={this.openModal('timeUsage')} />
                </div>
                <div className='form-control checkbox-wrapper'>
                  <Checkbox label='Cycle Statistics' />
                </div>
                <div className={this.generateClasses('passBucket')}>
                  <Checkbox label='Pass/Bucket Payload' onCheck={this.onCheck('passBucket')} />
                  <ArrowDropDown onClick={this.openModal('passBucket')} />
                </div>
                <div className={this.generateClasses('backetDistribution')}>
                  <Checkbox label='Pass/Bucket Distribution' onCheck={this.onCheck('backetDistribution')} />
                  <ArrowDropDown onClick={this.openModal('backetDistribution')} />
                </div>
              </div>
              <div className='buttons'>
                <RaisedButton label='Cancel' />
                <RaisedButton label='Submit' primary={true} onClick={this.props.onSubmit} />
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default Configuration
