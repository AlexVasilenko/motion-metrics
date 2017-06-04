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
  }

  constructor() {
    super()
    this.state = {

    }
  }

  onSubmit() {
    debugger
  }

  render() {
    const {isEditMode, user, form} = this.props;
    return (
        <div className='container'>
          <div className="step">
            <form className="general" action="#" noValidate>
              <h1>General Setting</h1>
              <Slider className="enable-toggle" formControlName="enabled" name="enabled">
              </Slider>
              <span>
              <div>
                <Toggle
                    label={ form.enabled ? 'Task enabled' : 'Task disabled' }
                />
              </div>
         <TextField
             hintText="Task Title"
             errorText="This field is required"
             name="title"
         /><br />
      </span>
              <div className="form-control focusable-icon">
                <div className="form-control-main select-wrapper">
                  <Assignment />
                  <SelectField placeholder="Task Type" formControlName="type" name="type"
                               required>
                    <MenuItem value={1} primaryText="Payload Monitoring Report"/>
                    <MenuItem value={2} primaryText="Fragmentation Monitoring Report"/>
                    <MenuItem value={3} primaryText="Tooth Detection Report"/>
                  </SelectField>
                  <div>This is required.</div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-control focusable-icon">
                  <div className="form-control-main">
                    <Place />
                    <input placeholder="Time Zone" required formControlName="timeZone"/>
                    <div>This is required.</div>
                  </div>
                </div>
                <div className="form-control focusable-icon">
                  <AccessTime />
                  <div className="form-control-main date-wrapper">
                    <TimePicker hintText="12hr Format" type="time" formControlName="reportTime" required
                                placeholder="Report Time"
                                name="time"/>
                    <div>This is required.</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="form-control focusable-icon">
                  <Today />
                  <div className="form-control-main date-wrapper">
                    <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape"
                                formControlName="from" required placeholder="From" name="from"/>
                    <div>This is required.</div>
                  </div>
                </div>
                <div className="form-control select-wrapper focusable-icon">
                  <Repeat />
                  <SelectField placeholder="Repeat" formControlName="repeat" name="type"
                               required multiple align="end">
                    <MenuItem value={1} align="end" primaryText="Monday"/>
                    <MenuItem value={2} primaryText="Tuesday"/>
                    <MenuItem value={3} primaryText="Wednesday"/>
                    <MenuItem value={4} primaryText="Thursday"/>
                    <MenuItem value={5} primaryText="Friday"/>
                    <MenuItem value={6} primaryText="Saturday"/>
                    <MenuItem value={7} primaryText="Sunday"/>
                  </SelectField>
                </div>
              </div>
              <div className="form-control tags-wrapper focusable-icon">
                <People />
                <input placeholder="recipient"/>
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

export default GeneralSettings
