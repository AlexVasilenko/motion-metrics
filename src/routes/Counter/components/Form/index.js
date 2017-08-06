import React from 'react'
import PropTypes from 'prop-types'
import GeneralSettings from './../generalSettingsForm'
import Configuration from './../configuration'
import { browserHistory } from 'react-router'

import './form.scss'


class Form extends React.Component {
  PropTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
  }

  constructor (props) {
    super()

    this.state = {
      step: 1,

      values: {
        enabled: false,
        title: '',
        monitoringReport: '',
        timeZone: '',
        from: '',
        recipient: '',
        configuration: {
          equipment: '',
          unit: '',
          configuration: {
            productivity: {},
            timeUsage: {},
            cycleStatistics: {},
            passBucketPayload: {},
            passBucketDistribution: {}
          }
        }
      }
    }
    this.nextStep = this.nextStep.bind(this)
  }

  nextStep (formName, data) {
    const { step } = this.state
    if (step !== 2) {
      this.setState({
        step: this.state.step + 1,
        values: {
          ...this.state.values,
          ...data,
        },
      })
    } else {
      const newElement = {
        ...this.state.values,
        configuration: data.configuration,
        equipment: data.equipment,
      }

      this.props.saveItem(newElement).then(() => {
        browserHistory.push('/')
      })
    }
  }

  handleChange (field) {
    return (evt) => this.setState({ [field]: evt.target.value })
  }

  back () {
    return () => {
      this.setState({
        step: 1,
      })
      this.props.back()
    }
  }

  render () {
    const { isEditMode, user, form, step, getTimeZone, uniqueName, editItem } = this.props
    if (this.state.step === 1) {
      return <GeneralSettings
        form={form}
        editItem={editItem}
        onSubmit={this.nextStep}
        getTimeZone={getTimeZone}
        uniqueName={uniqueName}
        isEditMode={isEditMode}
      />
    } else if (this.state.step === 2) {
      return <Configuration
        onSubmit={this.nextStep}
        isEditMode={isEditMode}
        editItem={editItem}
        back={this.back()}
      />
    }
  }
}

export default Form
