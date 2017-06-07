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
import 'babel-polyfill'
/* icons */
import Assignment from 'material-ui/svg-icons/action/assignment'
import Place from 'material-ui/svg-icons/maps/place'
import AccessTime from 'material-ui/svg-icons/device/access-time'
import Today from 'material-ui/svg-icons/action/today'
import Repeat from 'material-ui/svg-icons/av/repeat'
import People from 'material-ui/svg-icons/social/people'

const itemsForSelectFields = [
    { name: 'Monday', value: 'Mon' },
    { name: 'Tuesday', value: 'Tue' },
    { name: 'Wednesday', value: 'Wed' },
    { name: 'Thursday', value: 'Thur' },
    { name: 'Friday', value: 'Fri' },
    { name: 'Saturday', value: 'Sat' },
    { name: 'Sunday', value: 'Sun' },
]

const defaultRepeatValue = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']


class GeneralSettings extends React.Component {
  PropTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    saveItem: PropTypes.func,
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
      errors: {}
    }
    this.onChange = this.onSubmit()
    this.submit = this.submitHandle()
    this.handleMonitoringReport = (event, index, value) => this.setState({ monitoringReport: value })
    this.handleTimeZone = (event, value) => this.setState({ timeZone: value })
    this.handleDate = (event, value) => this.setState({ from: value })
  }

  repeatChange (value, index) {
    // refactor this method
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

  onSubmit () {
    return () => {
      this.setState({
        enabled: !this.state.enabled,
      })
    }
  }

  validate (values) {
    let findError = false
    const roles = {
      required: {
        fn: (value) => !!value.length,
        text: 'This is required',
        fields: ['title', 'monitoringReport', 'timeZone', 'from']
      }
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
        title: this.title.getValue(),
        monitoringReport: this.state.monitoringReport,
        timeZone: this.state.timeZone,
        from: this.state.from,
      }
      const errors = this.validate(validateValues)
      if (errors) {
        this.setState({
          errors,
        })
      } else {
        const values = {
          ...validateValues,
        }
        this.props.saveItem('generalSetting', values)
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
            <Slider className='enable-toggle' formControlName='enabled' name='enabled' />
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
                  formControlName='type'
                  errorText={this.state.errors.monitoringReport}
                  name='type'
                  value={this.state.monitoringReport}
                  onChange={this.handleMonitoringReport} >
                  <MenuItem value={1} primaryText='Payload Monitoring Report' />
                  <MenuItem value={2} primaryText='Fragmentation Monitoring Report' />
                  <MenuItem value={3} primaryText='Tooth Detection Report' />
                </SelectField>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control focusable-icon'>
                <div className='form-control-main'>
                  <Place />
                  <input placeholder='Time Zone' required formControlName='timeZone'/>
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
                    formControlName='from'
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
                  fields={itemsForSelectFields} />
              </div>
            </div>
            <div className='form-control tags-wrapper focusable-icon'>
              <People />
              <input placeholder='recipient' />
            </div>
            <div className='buttons'>
              <RaisedButton label='Cancel' />
              <RaisedButton label='Submit' primary={true} onClick={this.submit} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default GeneralSettings
