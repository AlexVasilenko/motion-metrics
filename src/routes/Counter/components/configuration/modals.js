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
        open={this.state.open.productivity}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='0.1'
          max='99.999'
          step='0.001'
          defaultValue={this.state.values.productivity.productivity}
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
        open={this.state.open.timeUsage}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='60'
          max='9999'
          step='1'
          defaultValue={this.state.values.timeUsage.timeUsageVal}
          ref={(timeUsageVal) => { this.timeUsageVal = timeUsageVal }} />
      </Dialog>
    )
  }

  export function passBucket () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('passBucket')}
        modal={false}
        open={this.state.open.passBucket}
        onRequestClose={this.handleClose}
      >
        <input
          type='number'
          min='0'
          max='100'
          step='1'
          defaultValue={this.state.values.passBucket.passBucketNumber}
          ref={(passBucketNumber) => this.passBucketNumber = passBucketNumber} />
        <div>{this.state.values.passBucket.showMoving}</div>
        <Toggle
          defaultToggled={this.state.values.passBucket.showMoving}
          label='Show Moving Average'
          ref={(showMoving) => this.showMoving = showMoving}
        />
        <Toggle
          defaultToggled={this.state.values.passBucket.showShift}
          label='Show Shift Colors'
          ref={(showShift) => this.showShift = showShift}
        />
      </Dialog>
    )
  }

  export function backetDistribution () {
    return (
      <Dialog
        title='Time Usage'
        actions={this.getActions('backetDistribution')}
        modal={false}
        open={this.state.open.backetDistribution}
        onRequestClose={this.handleClose}
      >
        <Toggle
          defaultToggled={this.state.values.backetDistribution.separateShifts}
          label='Separate By Shifts'
          ref={(separateShifts) => this.separateShifts = separateShifts}
        />
      </Dialog>
    )
  }
