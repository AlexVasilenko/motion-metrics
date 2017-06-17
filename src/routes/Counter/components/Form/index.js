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

      generalSetting: {
        enabled: false,
        title: '',
        monitoringReport: '',
        timeZone: '',
        from: '',
        recipient: '',
      },
      confirm: {
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

  nextStep(formName, data) {
    debugger
    const { step } = this.state;
    if (step !== 2) {
      this.setState({
        step: this.state.step + 1,
        [formName]: data,
      })
    } else {
      debugger
      const newElement = {
          ...this.state.generalSetting,
          ...this.state.confirm
      }
      this.props.saveItem(newElement);
    }
  }

  handleChange(field) {
    return (evt) => this.setState({ [field]: evt.target.value })
  }

  render() {
    const {isEditMode, user, form, step, getTimeZone} = this.props
    if (this.state.step === 2) {
      return <GeneralSettings form={form} onSubmit={this.nextStep} getTimeZone={getTimeZone} />
    } else if (this.state.step === 1) {
      return <Configuration onSubmit={this.nextStep} />
    }
  }
}

export default Form
