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
      form: {

      }
    }
  }

  render() {
    return (
        <div className='container'>
          <div className="step">
            <form className="general" action="#" noValidate>
              <h1>Configuration</h1>
              <div className="form-control focusable-icon" formGroupName="configuration">
                <Devices />
                <input name="equipment"/>
              </div>
              <div className="form-control focusable-icon">
                <div className="form-control-main select-wrapper">
                  <LinearScale />
                  <SelectField placeholder="Unit System Setting" name="type" required
                               formControlName="unit">
                    <MenuItem value={1} primaryText="m kg s"/>
                    <MenuItem value={2} primaryText="cm kg s"/>
                    <MenuItem value={3} primaryText="mm g s"/>
                    <MenuItem value={4} primaryText="in lb s"/>
                  </SelectField>
                  <div>This is required.</div>
                </div>
              </div>
              <h2>Report Components</h2>
              <div formGroupName="configuration" className="configuration">
                <div className="form-control checkbox-wrapper" formGroupName="productivity">
                  <Checkbox label="Productivity"/>
                  <ArrowDropDown />
                </div>
                <div className="form-control checkbox-wrapper" formGroupName="timeUsage">
                  <Checkbox label="Time Usage"/>
                  <ArrowDropDown />
                </div>
                <div className="form-control checkbox-wrapper" formGroupName="cycleStatistics">
                  <Checkbox label="Cycle Statistics"/>
                </div>
                <div className="form-control checkbox-wrapper" formGroupName="passBucketPayload">
                  <Checkbox label="Pass/Bucket Payload"/>
                  <ArrowDropDown />
                </div>
                <div className="form-control checkbox-wrapper" formGroupName="passBucketDistribution">
                  <Checkbox label="Pass/Bucket Distribution"/>
                  <ArrowDropDown />
                </div>
              </div>
              <div className="buttons">
                <RaisedButton label="Cancel"/>
                <RaisedButton label="Submit" primary={true} onClick={this.props.onSubmit} />
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default Configuration
