import React from 'react'

const hoc = (component, updateFn, submit, validateInfo) => {
  const newSubmitFn = (data) => {
    const errors = validateInfo.fn(data)
    if (!errors) {
      submit(data)
    } else {
      this.errors = errors
    }
  }
  return (
    <component
      update={updateFn}
      submit={newSubmitFn}
      errors={this.errors}
    />
  )
}

export default hoc
