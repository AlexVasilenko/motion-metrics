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

const allRefsForModals = {
  productivity: ['productivity'],
  timeUsage: ['timeUsageVal'],
  passBucket: [
    'passBucketNumber',
    'showMoving',
    'showShift'
  ],
  backetDistribution: ['separateShifts'],
}

const unitSettingsFields = ['m kg s', 'cm kg s', 'mm g s', 'in lb s']

const reportComponents = ['productivity', 'timeUsage', 'Cycle Statistics', 'passBucket', 'backetDistribution']

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
      values: {
        productivity: {},
        timeUsage: {},
        passBucket: {},
        backetDistribution: {},
      },
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
        fields: ['equipment']
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
        equipment: this.equipment.getValue(),
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
          ...this.state.values,
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

  handleClose (name) {
    return () => {
      this.setState({
        open: {
          ...this.state.open,
          [name]: false,
        }
      })
    }
  }

  saveValue (name) {
    return () => {
      const values = {}
      const fields = allRefsForModals[name]

      for (let refName of fields) {
        if (refName) {
          values[refName] = this[refName].value
        }
      }
      this.setState({
        values: {
          ...this.state.values,
          [name]: values,
        },
        open: {
          ...this.state.open,
          [name]: false,
        }
      })
    }
  }

  getActions (name) {
    return [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleClose(name)}
        />,
      <FlatButton
        label='Ok'
        primary
        keyboardFocused
        onTouchTap={this.saveValue(name)}
      />,
    ]
  }

  productivityPopup () {
    return (
      <Dialog
        title='Productivity'
        actions={this.getActions('productivity')}
        modal={false}
        open={this.state.open.productivity}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='0.1'
          max='99.999'
          step='0.001'
          defaultValue={this.state.values.productivity.productivity}
          ref={(productivity) => this.productivity = productivity} />
      </Dialog>
    )
  }

  timeUsage () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('timeUsage')}
        modal={false}
        open={this.state.open.timeUsage}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='60'
          max='9999'
          step='1'
          defaultValue={this.state.values.timeUsage.timeUsageVal}
          ref={(timeUsageVal) => { this.timeUsageVal = timeUsageVal }} />
      </Dialog>
    )
  }

  passBucket () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('passBucket')}
        modal={false}
        open={this.state.open.passBucket}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='0'
          max='100'
          step='1'
          defaultValue={this.state.values.passBucket.passBucketNumber}
          ref={(passBucketNumber) => this.passBucketNumber = passBucketNumber} />
        <div>{this.state.values.passBucket.showMoving}</div>
        <Toggle
          defaultToggled={this.state.values.passBucket.showMoving}
          label='Show Moving Average'
          ref={(showMoving) => this.showMoving = showMoving}
        />
        <Toggle
          defaultToggled={this.state.values.passBucket.showShift}
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
        actions={this.getActions('backetDistribution')}
        modal={false}
        open={this.state.open.backetDistribution}
        onRequestClose={this.handleClose}
      >
        <Toggle
          defaultToggled={this.state.values.backetDistribution.separateShifts}
          label='Separate By Shifts'
          ref={(separateShifts) => this.separateShifts = separateShifts}
        />
      </Dialog>
    )
  }

  generateReports (name, key) {
    if (name === 'Cycle Statistics') {
      return (
        <div className='form-control checkbox-wrapper' key={key}>
          <Checkbox label={name} />
        </div>
      )
    }
    return (
      <div className={this.generateClasses(name)} key={key}>
        <Checkbox label={name} onCheck={this.onCheck(name)} />
        <ArrowDropDown onClick={this.openModal(name)} />
      </div>
    )
  }

  render () {
    return (
        <div className='container'>
          { this.productivityPopup() }
          { this.timeUsage() }
          { this.passBucket() }
          { this.backetDistribution() }
          <div className='step'>
            <form className='general' noValidate>
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
                    {
                      unitSettingsFields.map((name, key) => <MenuItem value={name} primaryText={name} key={key} />)
                    }
                  </SelectField>
                  <div>This is required.</div>
                </div>
              </div>
              <h2>Report Components</h2>
              <div className='configuration'>
                {
                  reportComponents.map((name, key) => this.generateReports(name, key))
                }
              </div>
              <div className='buttons'>
                <RaisedButton label='Cancel' />
                <RaisedButton label='Submit' primary onClick={this.submitHandle()} />
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default Configuration
