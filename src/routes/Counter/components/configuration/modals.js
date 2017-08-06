import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import classNames from 'classnames'

import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

  export function productivityPopup () {
    return (
      <Dialog
        title='Productivity'
        actions={this.getActions('productivity')}
        modal={false}
        open={this.state.values.productivity.open}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='0.1'
          max='99.999'
          step='0.001'
          defaultValue={this.state.values.productivity.value}
          ref={(productivity) => this.productivity = productivity} />
      </Dialog>
    )
  }

  export function timeUsage () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('timeUsage')}
        modal={false}
        open={this.state.values.timeUsage.open}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='60'
          max='9999'
          step='1'
          defaultValue={this.state.values.timeUsage.value}
          ref={(timeUsage) => { this.timeUsageVal = timeUsage }} />
      </Dialog>
    )
  }

  export function passBucket () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('passBucketPayload')}
        modal={false}
        open={this.state.values.passBucketPayload.open}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='0'
          max='100'
          step='1'
          defaultValue={this.state.values.passBucketPayload.movingAveragePoints}
          ref={(movingAveragePoints) => this.movingAveragePoints = movingAveragePoints} />
        <div>{this.state.values.passBucketPayload.showMovingAverage}</div>
        <Toggle
          defaultToggled={this.state.values.passBucketPayload.showMovingAverage}
          label='Show Moving Average'
          ref={(showMovingAverage) => this.showMovingAverage = showMovingAverage}
        />
        <Toggle
          defaultToggled={this.state.values.passBucketPayload.showShiftColors}
          label='Show Shift Colors'
          ref={(showShiftColors) => this.showShiftColors = showShiftColors}
        />
      </Dialog>
    )
  }

  export function backetDistribution () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('passBacketDistribution')}
        modal={false}
        open={this.state.values.passBacketDistribution.open}
        onRequestClose={this.handleClose}
      >
        <Toggle
          defaultToggled={this.state.values.passBacketDistribution.separateShifts}
          label='Separate By Shifts'
          ref={(separateShifts) => this.separateShifts = separateShifts}
        />
      </Dialog>
    )
  }
