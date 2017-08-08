import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Stepper from './../Stepper'
import _ from 'lodash'
/* icons */
import Devices from 'material-ui/svg-icons/device/devices'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Validator from '../../../../components/validator'
import roles from './validationRoles'

import {
    productivityPopup,
    timeUsage,
    passBucket,
    backetDistribution,
} from './modals'

import './styles.scss'

const allRefsForModals = {
  'productivity': [
    {
      ref: 'productivity',
      refValue: 'value',
      getValue: 'value',
    }
  ],
  'timeUsage': [
    {
      ref: 'timeUsage',
      refValue: 'value',
      getValue: 'value',
    }
  ],
  'passBucketPayload': [
    { ref: 'movingAveragePoints', refValue: 'movingAveragePoints', getValue: 'state.switched' },
    { ref: 'showMovingAverage', refValue: 'showMovingAverage', getValue: 'state.switched' },
    { ref: 'showShiftColors', refValue: 'showShiftColors', getValue: 'state.switched' },
  ],
  'passBacketDistribution': [
    { ref: 'separateShifts', refValue: 'value', getValue: 'value' },
  ],
}

const unitSettingsFields = ['m kg s', 'cm kg s', 'mm g s', 'in lb s']

const reportComponents = ['productivity', 'timeUsage', 'cycleStatistics', 'passBucketPayload', 'passBacketDistribution']

class Configuration extends React.Component {
  static propTypes = {
    isEditMode: PropTypes.bool,
    onSubmit: PropTypes.func,
    editItem: PropTypes.object,
    unit: PropTypes.string,
    values: PropTypes.object,
    back: PropTypes.func,
  }

  static defaultProps = {
    unit: '',
    values: {
      productivity: {
        enabled: false,
        open: false,
        value: 0.1,
      },
      timeUsage: {
        enabled: false,
        open: false,
        value: 0,
      },
      cycleStatistics: {
        enabled: false,
        open: false,
      },
      passBucketPayload: {
        enabled: false,
        open: false,
        showMovingAverage: false,
        showShiftColors: false,
        movingAveragePoints: 0,
      },
      passBacketDistribution: {
        open: false,
        enabled: false,
        separateShifts: false,
      },
    },
  }

  constructor (props) {
    super()
    // not so good
    if (props.isEditMode) {
      const { productivity,
              timeUsage,
              cycleStatistics,
              passBucketPayload,
              passBacketDistribution } = props.editItem.configuration
      this.state = {
        unit: props.editItem.unit,
        values: {
          productivity: {
            ...productivity,
            open: false,
          },
          timeUsage: {
            ...timeUsage,
            open: false,
          },
          cycleStatistics: {
            ...cycleStatistics,
            open: false,
          },
          passBacketDistribution: {
            ...passBacketDistribution,
            open: false,
          },
          passBucketPayload: {
            ...passBucketPayload,
            open: false,
          },
        }
      }
    } else {
      this.state = {
        unit: props.unit,
        values: props.values,
      }
    }
  }

  submitHandle () {
    return () => {
      const validateValues = {
        equipment: this.equipment.getValue(),
      }
      const validFn = new Validator({
        sync: roles,
      }, (data) => {
        if (data.status === 'pending') {

        } else if (data.status === 'invalid') {
          this.setState({
            errors: data.errors,
          })
        } else {
          this.props.onSubmit('configuration', {
            ...validateValues,
            configuration: this.state.values,
          })
        }
      })

      validFn.validator(validateValues)
    }
  }

  openModal (name) {
    return () => {
      if (this.state.values[name].enabled) {
        this.setState({
          values: {
            ...this.state.values,
            [name]: {
              ...this.state.values[name],
              open: true,
            },
          }
        })
      }
    }
  }

  generateClasses (name) {
    return classNames({
      'form-control': true,
      'checkbox-wrapper': true,
      'disabled': !this.state.values[name].enabled,
    })
  }

  onCheck (name) {
    return () => {
      this.setState({
        values: {
          ...this.state.values,
          [name]: {
            ...this.state.values[name],
            enabled: !this.state.values[name].enabled,
          },
        }
      })
    }
  }

  handleClose (name) {
    return () => {
      this.setState({
        values: {
          ...this.state.values,
          [name]: {
            ...this.state.values[name],
            open: false,
          },
        }
      })
    }
  }

  saveValue (name) {
    return () => {
      const values = {
        enabled: true,
      }
      const fields = allRefsForModals[name]

      for (let refName of fields) {
        const { refValue, ref, getValue } = refName
        _.set(values, refValue, _.get(this[ref], getValue, false))
      }
      this.setState({
        values: {
          ...this.state.values,
          [name]: values,
        },
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
    if (name === 'cycleStatistics') {
      return (
        <div className='form-control checkbox-wrapper' key={key}>
          <Checkbox label={name} defaultChecked={this.state.values[name].enabled} />
        </div>
      )
    }
    return (
      <div className={this.generateClasses(name)} key={key}>
        <Checkbox defaultChecked={this.state.values[name].enabled} label={name} onCheck={this.onCheck(name)} />
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
            <Stepper step={1} editMode={this.props.isEditMode} />
            <h1>Configuration</h1>
            <div className='form-control focusable-icon'>
              <Devices />
              <TextField
                hintText='Equipment'
                name='equipment'
                ref={(equipment) => { this.equipment = equipment }}
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
              <RaisedButton
                onClick={this.props.back}
                label='Back'
              />
              <RaisedButton
                label={this.props.isEditMode ? 'update' : 'create'}
                primary
                onClick={this.submitHandle()}
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Configuration
