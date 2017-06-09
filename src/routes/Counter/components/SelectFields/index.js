import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

const generateMenuItem = (item, index, onChange, text) => (
  <MenuItem value={index} key={index}>
    <Checkbox
      label={item.name}
      labelPosition='left'
      onCheck={onChange(item.value, index)}
      checked={text.indexOf(item.value) !== -1}
    />
  </MenuItem>
)

const SelectFields = ({ onChange, fields, text }) => (
  <SelectField placeholder='Repeat' multiple hintText={text}>
    { fields.map((item, index) => generateMenuItem(item, index + 1, onChange, text)) }
  </SelectField>
    )

SelectFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
}

export default SelectFields
