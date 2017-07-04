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
import validator from '../../../../components/validator'
import roles from './validationRoles'

import {
    productivityPopup,
    timeUsage,
    passBucket,
    backetDistribution,
} from './modals'

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

  submitHandle () {
    return () => {
      const validateValues = {
        equipment: this.equipment.getValue(),
      }
      const errors = validator(validateValues, roles)
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
          { productivityPopup.call(this) }
          { timeUsage.call(this) }
          { passBucket.call(this) }
          { backetDistribution.call(this) }
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
