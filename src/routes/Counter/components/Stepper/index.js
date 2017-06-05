import React from 'react'
import PropTypes from 'prop-types'
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper'

const StepComponent = ({ step }) => (
    <Stepper activeStep={step}>
        <Step>
            <StepLabel>General Setting</StepLabel>
        </Step>
        <Step>
            <StepLabel>Configuration</StepLabel>
        </Step>
    </Stepper>
)
StepComponent.propTypes = {
  step: PropTypes.number.isRequired,
}

export default StepComponent
