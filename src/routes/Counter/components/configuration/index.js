import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
/* icons */
import Devices from 'material-ui/svg-icons/device/devices'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'


class Configuration extends React.Component {
  PropTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = {
      unit: ''
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

  render() {
    return (
        <div className='container'>
          <div className='step'>
            <form className='general' action='#' noValidate>
              <h1>Configuration</h1>
              <div className='form-control focusable-icon' formGroupName='configuration'>
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
                    errorText={this.state.errors.unit}
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
              <div formGroupName='configuration' className='configuration'>
                <div className='form-control checkbox-wrapper' formGroupName='productivity'>
                  <Checkbox label='Productivity' />
                  <ArrowDropDown />
                </div>
                <div className='form-control checkbox-wrapper' formGroupName='timeUsage'>
                  <Checkbox label='Time Usage' />
                  <ArrowDropDown />
                </div>
                <div className='form-control checkbox-wrapper' formGroupName='cycleStatistics'>
                  <Checkbox label='Cycle Statistics' />
                </div>
                <div className='form-control checkbox-wrapper' formGroupName='passBucketPayload'>
                  <Checkbox label='Pass/Bucket Payload' />
                  <ArrowDropDown />
                </div>
                <div className='form-control checkbox-wrapper' formGroupName='passBucketDistribution'>
                  <Checkbox label='Pass/Bucket Distribution' />
                  <ArrowDropDown />
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
