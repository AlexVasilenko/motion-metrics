import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'material-ui/Slider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
/* icons */
import Assignment from 'material-ui/svg-icons/action/assignment'
import Place from 'material-ui/svg-icons/maps/place'
import AccessTime from 'material-ui/svg-icons/device/access-time'
import Today from 'material-ui/svg-icons/action/today'
import Repeat from 'material-ui/svg-icons/AV/repeat'
import People from 'material-ui/svg-icons/social/people'
import Devices from 'material-ui/svg-icons/device/devices'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'


export const Form = ({ isEditMode, user, form }) => (
  <div className='container'>
  <div className="step">
    <form className="general" action="#" novalidate>
      <h1>General Setting</h1>
      <Slider className="enable-toggle" formControlName="enabled" name="enabled">
        { form.enabled ? 'Task enabled' : 'Task disabled' }
      </Slider>
      <span>
        <input mdInput placeholder="Task Title" name="title" formControlName="title" required />
        <div>This is required.</div>
        <div>A task with this name already exists.</div>
        <div>Task title must be less than 50 characters long.</div>
      </span>
      <div className="form-control focusable-icon">
        <div className="form-control-main select-wrapper">
          <!-- don't ask - this is the way material for angular2 is working -->
          <input style="display: none;" name="type" formControlName="type" />
          <SelectField placeholder="Task Type" formControlName="type" name="type"
            required>
            <MenuItem value={1} primaryText="Payload Monitoring Report" />
            <MenuItem value={2} primaryText="Fragmentation Monitoring Report" />
            <MenuItem value={3} primaryText="Tooth Detection Report" />
          </SelectField>
          <div>This is required.</div>
        </div>
        <Assignment />
      </div>
      <div className="form-group">
        <div className="form-control focusable-icon">
          <div className="form-control-main">
            <input placeholder="Time Zone" required formControlName="timeZone" />
            <div>This is required.</div>
            <AutoComplete />
          </div>
          <Place />
        </div>
        <div className="form-control focusable-icon">
          <div className="form-control-main date-wrapper">
            <input style="display: none;" mdInput name="reportTime" formControlName="reportTime" />
            <TimePicker hintText="12hr Format" type="time" formControlName="reportTime" required placeholder="Report Time"
              name="time" />
            <div>This is required.</div>
          </div>
          <AccessTime />
        </div>
      </div>

      <div className="form-group">
        <div className="form-control focusable-icon">
          <div className="form-control-main date-wrapper">
            <input style="display: none;" name="type" formControlName="type" />
            <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" formControlName="from" required placeholder="From" name="from" />
            <div>This is required.</div>
          </div>
          <Today />
        </div>
        <div className="form-control select-wrapper focusable-icon">
          <input style="display: none;" mdInput name="type" formControlName="repeat" />
          <SelectField placeholder="Repeat" formControlName="repeat" name="type"
            required multiple align="end">
            <MenuItem value={1} align="end" primaryText="Monday" />
            <MenuItem value={2} primaryText="Tuesday" />
            <MenuItem value={3} primaryText="Wednesday" />
            <MenuItem value={4} primaryText="Thursday" />
            <MenuItem value={5} primaryText="Friday" />
            <MenuItem value={6} primaryText="Saturday" />
            <MenuItem value={7} primaryText="Sunday" />
          </SelectField>
          <Repeat />
        </div>
      </div>
      <div className="form-control tags-wrapper focusable-icon">
        <input placeholder="recipient" />
        <People />
      </div>
      <div className="buttons">
        <RaisedButton label="Cancel" />
        <RaisedButton label="Submit" primary={true} />
      </div>
    </form>
    <form className="general" action="#" novalidate>
      <h1>Configuration</h1>
      <div className="form-control focusable-icon" formGroupName="configuration">
        <input name="equipment" />
        <Devices />
      </div>
      <div className="form-control focusable-icon">
        <div className="form-control-main select-wrapper">
          <!-- don't ask - this is the way material for angular2 is working -->
          <input style="display: none;" name="unit" />
          <SelectField placeholder="Unit System Setting" name="type" required
            formControlName="unit">
            <MenuItem value={1} primaryText="m kg s" />
            <MenuItem value={2} primaryText="cm kg s" />
            <MenuItem value={3} primaryText="mm g s" />
            <MenuItem value={4} primaryText="in lb s" />
          </SelectField>
          <div>This is required.</div>
        </div>
        <LinearScale />
      </div>
      <h2>Report Components</h2>
      <div formGroupName="configuration" className="configuration">
        <div className="form-control checkbox-wrapper" formGroupName="productivity">
          <Checkbox label="Productivity" />
          <ArrowDropDown />
        </div>
        <div className="form-control checkbox-wrapper" formGroupName="timeUsage">
          <Checkbox label="Time Usage" />
          <ArrowDropDown />
        </div>
        <div className="form-control checkbox-wrapper" formGroupName="cycleStatistics">
          <Checkbox label="Cycle Statistics" />
        </div>
        <div className="form-control checkbox-wrapper" formGroupName="passBucketPayload">
          <Checkbox label="Pass/Bucket Payload" />
          <ArrowDropDown />
        </div>
        <div className="form-control checkbox-wrapper" formGroupName="passBucketDistribution">
          <Checkbox label="Pass/Bucket Distribution" />
          <ArrowDropDown />
        </div>
      </div>
      <div className="buttons">
        <RaisedButton label="Cancel" />
        <RaisedButton label="Submit" primary={true} />
      </div>
    </form>
  </div>
</div>
)
Form.propTypes = {
  user: PropTypes.object,
  isEditMode: PropTypes.bool,
}

export default Form
