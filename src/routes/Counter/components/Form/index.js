import React from 'react'
import PropTypes from 'prop-types'
import GeneralSettings from './../generalSettingsForm'
import Configuration from './../configuration'

import './form.scss'


class Form extends React.Component {
  PropTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = {
      step: 1,

      element: {
        enabled: false,
        title: '',
        monitoringReport: '',
        timeZone: '',
        from: '',
        recipient: '',

        equipment: '',
        unit: '',
        configuration: {
          productivity: '',
          timeUsage: '',
          cycleStatistics: '',
          passBucketPayload: '',
          passBucketDistribution: ''
        }
      }
    }
    this.nextStep = this.nextStep.bind(this)
  }

  nextStep() {
    const { step } = this.state;
    if (step !== 2) {
      this.setState({
        step: this.state.step + 1
      })
    } else {
      this.props.saveItem(this.state.element);
    }
  }

  handleChange(field) {
    return (evt) => this.setState({ [field]: evt.target.value });
  }

  render() {
    const {isEditMode, user, form, step} = this.props;
    if (step === 1) {
      return <GeneralSettings form={form} onSubmit={this.nextStep} />
    } else if (step === 2) {
      return <Configuration onSubmit={this.nextStep} />
    }
  }
}

export default Form
