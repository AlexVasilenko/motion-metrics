import React from 'react'
import PropTypes from 'prop-types'
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper'

const StepComponent = ({ step, editMode }) => (
    <Stepper activeStep={step}>
        <Step completed={editMode}>
            <StepLabel>General Setting</StepLabel>
        </Step>
        <Step completed={editMode}>
            <StepLabel>Configuration</StepLabel>
        </Step>
    </Stepper>
)
StepComponent.propTypes = {
  step: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
}

export default StepComponent
