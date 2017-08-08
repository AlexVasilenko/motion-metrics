import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import Stepper from './../Stepper'
import SelectFields from './../SelectFields'
import AutoComplete from 'material-ui/AutoComplete'
import 'babel-polyfill'
import Validator from '../../../../components/validator'
import { Link } from 'react-router'

import {
  itemsForSelectFields,
  recipients,
  defaultRepeatValue,
  roles,
  monitoringReport,
} from './config'
/* icons */
import Assignment from 'material-ui/svg-icons/action/assignment'
import Place from 'material-ui/svg-icons/maps/place'
import AccessTime from 'material-ui/svg-icons/device/access-time'
import Today from 'material-ui/svg-icons/action/today'
import Repeat from 'material-ui/svg-icons/av/repeat'
import People from 'material-ui/svg-icons/social/people'

import './styles.scss'

class GeneralSettings extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    saveItem: PropTypes.func,
    form: PropTypes.object,
    getTimeZone: PropTypes.func,
    editItem: PropTypes.object,
    onSubmit: PropTypes.func,
  }

  constructor (props) {
    super()
    this.state = {
      enabled: false,
      title: '',
      monitoringReport: '',
      repeat: defaultRepeatValue.map(item => item),
      timeZone: 'Type text',
      reportTime: '',
      recipient: '',
      errors: {},
    }
    this.onChange = () => this.setState({ enabled: !this.state.enabled })
    this.submit = this.submitHandle()
    this.handleMonitoringReport = (event, index, value) => this.setState({ monitoringReport: value })
    this.handleRecipient = (event, index, value) => this.setState({ recipient: value })
    this.handleTimeZone = (event, value) => this.setState({ from: value.toString() })
    this.handleDate = (event, value) => this.setState({ reportTime: value })
    this.repeatFn = this.repeatChange.bind(this)

    if (props.editItem && props.editItem.id) {
      const {
        enabled,
        title,
        type,
        timeZone,
        from,
        recipient,
        repeat,
        id,
       } = props.editItem

      this.state = {
        id,
        enabled,
        title,
        monitoringReport: type,
        timeZone: timeZone || this.state.timeZone,
        from: new Date(from),
        repeat,
        recipient,
        errors: {},
      }
    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.editItem.id) {
      const {
        enabled,
        title,
        type,
        timeZone,
        from,
        recipient,
        id,
       } = newProps.editItem

      this.setState({
        id,
        enabled,
        title,
        monitoringReport: type,
        timeZone: timeZone || this.state.timeZone,
        from: new Date(from),
        recipient
      })
    }
  }

  repeatChange (value, index) {
    return () => {
      const arrayIndex = defaultRepeatValue.findIndex((item) => item.value === value)
      const inRepeat = this.state.repeat.findIndex(item => item.value === value)
      const currentArray = this.state.repeat
      if (inRepeat !== -1) {
        currentArray.splice(arrayIndex, 1)
      } else {
        currentArray.splice(arrayIndex, 0, defaultRepeatValue[arrayIndex])
      }

      this.setState({
        repeat: this.state.repeat
      })
    }
  }

  timeZoneFilter () {
    return (value) => {
      this.props.getTimeZone(value)
    }
  }

  asyncValidation (data, validates) {

  }

  submitHandle () {
    return () => {
      const validateValues = {
        title: this.title.getValue(),
        monitoringReport: this.state.monitoringReport,
        timeZone: this.state.timeZone.toString(),
        reportTime: this.state.reportTime,
        repeat: this.state.repeat.map(item => item.number),
      }
      const validFn = new Validator({
        sync: roles,
        async: {
          uniqueTitle: {
            values: {
              title: validateValues.title,
            },
            promise: (fields, res, rej) => {
              setTimeout(() => {
                res(true)
              }, 3000)
            }
          }
        }
      }, (data) => {
        if (data.status === 'pending') {

        } else if (data.status === 'invalid') {
          this.setState({
            errors: data.errors,
          })
        } else {
          this.props.onSubmit('generalSetting', {
            id: this.props.editItem.id || Math.random(),
            enabled: this.state.enabled,
            ...validateValues,
          })
        }
      })

      validFn.validator(validateValues)
    }
  }

  render () {
    const { isEditMode, form } = this.props
    return (
      <div className='container'>
        <div className='step'>
          <form className='general' action='#' noValidate>
            <Stepper step={0} editMode={isEditMode} />
            <span>
              <div>
                <Toggle
                  onToggle={this.onChange}
                  defaultToggled={this.state.enabled}
                  label={this.state.enabled ? 'Task enabled' : 'Task disabled'}
                  ref={(enabled) => { this.enabled = enabled }}
                />
              </div>
              <TextField
                className='fitElement'
                defaultValue={this.state.title}
                placeholder='Task Title'
                errorText={this.state.errors.title}
                name='title'
                ref={(title) => { this.title = title }}
              /><br />
            </span>
            <div className='form-control focusable-icon'>
              <div className='form-control-main select-wrapper'>
                <Assignment />
                <SelectField
                  className='fitElement'
                  style={{ width: '90%' }}
                  placeholder='Task Type'
                  errorText={this.state.errors.monitoringReport}
                  name='type'
                  value={this.state.monitoringReport}
                  onChange={this.handleMonitoringReport} >
                  {
                    monitoringReport.map(report => (<MenuItem
                      value={report}
                      primaryText={report}
                     />))
                  }
                </SelectField>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control focusable-icon'>
                <div className='form-control-main'>
                  <Place />
                  <AutoComplete
                    className='fitElement'
                    hintText={this.state.timeZone}
                    dataSource={this.props.form.timeZones}
                    onUpdateInput={this.timeZoneFilter()}
                    filter={(searchText, key) => true}
                  /><br />
                  <div>This is required.</div>
                </div>
              </div>
              <div className='form-control focusable-icon'>
                <AccessTime />
                <div className='form-control-main date-wrapper'>
                  <TimePicker
                    className='fitElement'
                    hintText='12hr Format'
                    format='24hr'
                    type='time'
                    placeholder='Report Time'
                    name='time'
                    value={this.state.from}
                    onChange={this.handleTimeZone}
                    defaultTime={this.state.from} />
                  <div>{this.state.errors.timeZone}</div>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control focusable-icon'>
                <Today />
                <div className='form-control-main date-wrapper'>
                  <DatePicker
                    className='fitElement'
                    hintText='Landscape Inline Dialog'
                    mode='landscape'
                    name='from'
                    value={this.state.from}
                    onChange={this.handleDate} />
                  <div>{this.state.errors.reportTime}</div>
                </div>
              </div>
              <div className='form-control select-wrapper focusable-icon'>
                <Repeat />
                <SelectFields
                  className='fitElement'
                  onChange={this.repeatFn}
                  text={this.state.repeat.map(item => item.value).join(',')}
                  errorText={this.state.errors.repeat}
                  fields={itemsForSelectFields} />
                <div>{ this.state.errors.repeat }</div>
              </div>
            </div>
            <div className='form-control tags-wrapper focusable-icon'>
              <People />
              <SelectField
                className='fitElement'
                placeholder='Recipient'
                errorText={this.state.errors.recipient}
                name='type'
                value={this.state.recipient}
                onChange={this.handleRecipient} >
                {
                  recipients.map((recipient, index) => (
                    <MenuItem
                      key={index}
                      value={recipient.name}
                      primaryText={recipient.value}
                    />))
                }
              </SelectField>
            </div>
            <div className='buttons'>
              <Link to='/'>
                <RaisedButton
                  label='Cancel'
                />
              </Link>
              <RaisedButton label='Continue' primary onClick={this.submit} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default GeneralSettings
