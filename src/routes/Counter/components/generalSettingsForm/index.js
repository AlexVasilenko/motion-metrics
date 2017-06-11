import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'material-ui/Slider'
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
import Chip from 'material-ui/Chip'
import 'babel-polyfill'

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

class GeneralSettings extends React.Component {
  PropTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    saveItem: PropTypes.func,
    form: PropTypes.object,
    getTimeZone: PropTypes.func,
  }

  constructor () {
    super()
    this.state = {
      enabled: false,
      title: '',
      monitoringReport: '',
      repeat: defaultRepeatValue,
      timeZone: '',
      from: '',
      recipient: '',
      errors: {},
    }
    this.onChange = () => this.setState({ enabled: !this.state.enabled })
    this.submit = this.submitHandle()
    this.handleMonitoringReport = (event, index, value) => this.setState({ monitoringReport: value })
    this.handleRecipient = (event, index, value) => this.setState({ recipient: value })
    this.handleTimeZone = (event, value) => this.setState({ timeZone: value })
    this.handleDate = (event, value) => this.setState({ from: value })
  }

  repeatChange (value, index) {
    return () => {
      const arrayIndex = this.state.repeat.findIndex((item) => item === value)
      const currentArray = this.state.repeat
      if (arrayIndex + 1) {
        currentArray.splice(arrayIndex, 1)
      } else {
        currentArray.splice(index - 1, 0, value)
      }

      this.setState({
        repeat: this.state.repeat
      })
    }
  }

  validate (values) {
    // move to validator file
    let findError = false

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

  timeZoneFilter () {
    return (value) => {
      this.props.getTimeZone(value)
    }
  }

  submitHandle () {
    return () => {
      const validateValues = {
        title: this.title.getValue(),
        monitoringReport: this.state.monitoringReport,
        timeZone: this.state.timeZone,
        from: this.state.from,
        repeat: this.state.repeat,
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

  render () {
    const {isEditMode, user, form} = this.props
    return (
      <div className='container'>
        <div className='step'>
          <form className='general' action='#' noValidate>
            <Stepper step={0} />
            <Slider className='enable-toggle' name='enabled' />
            <span>
              <div>
                <Toggle
                  onToggle={this.onChange}
                  label={ this.state.enabled ? 'Task enabled' : 'Task disabled' }
                  ref={(enabled) => this.enabled = enabled}
                />
              </div>
              <TextField
                hintText='Task Title'
                errorText={this.state.errors.title}
                name='title'
                ref={(title) => this.title = title}
              /><br />
            </span>
            <div className='form-control focusable-icon'>
              <div className='form-control-main select-wrapper'>
                <Assignment />
                <SelectField
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
                  <div>{this.state.timeZone.length}</div>
                  <AutoComplete
                    hintText='Type text'
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
                    hintText='12hr Format'
                    format='24hr'
                    type='time'
                    placeholder='Report Time'
                    name='time'
                    value={this.state.timeZone}
                    onChange={this.handleTimeZone} />
                  <div>{this.state.errors.timeZone}</div>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control focusable-icon'>
                <Today />
                <div className='form-control-main date-wrapper'>
                  <DatePicker
                    hintText='Landscape Inline Dialog'
                    mode='landscape'
                    name='from'
                    value={this.state.from}
                    onChange={this.handleDate} />
                  <div>{this.state.errors.from}</div>
                </div>
              </div>
              <div className='form-control select-wrapper focusable-icon'>
                <Repeat />
                <SelectFields
                  onChange={this.repeatChange.bind(this)}
                  text={this.state.repeat.join(',')}
                  errorText={this.state.errors.repeat}
                  fields={itemsForSelectFields} />
                <div>{ this.state.errors.repeat }</div>
              </div>
            </div>
            <div className='form-control tags-wrapper focusable-icon'>
              <People />
              <SelectField
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
              <RaisedButton label='Cancel' />
              <RaisedButton label='Submit' primary onClick={this.submit} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default GeneralSettings
