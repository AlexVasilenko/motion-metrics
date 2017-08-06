import Q from 'q'

class ValidatorClass {
  constructor (roles, updateStatus) {
    this.updateStatus = updateStatus
    this.roles = roles
  }

  validator (values) {
    let findError = false

    this._pending()
    const errors = {}
    for (let value in values) {
      for (let validate in this.roles.sync) {
        if (this.roles.sync[validate].fields.indexOf(value) !== -1) {
          if (!this.roles.sync[validate].fn(values[value]) && !errors[value]) {
            errors[value] = this.roles.sync[validate].text
            findError = true
          }
        }
      }
    }

    if (findError) {
      this._invalid(errors)
      return
    }

    if (!findError &&
      (!this.roles.async || !Object.keys(this.roles.async).length)) {
      this._valid()
      return
    }

    const promises = Object.keys(this.roles.async).map(item => {
      const { promise, values } = this.roles.async[item]
      return Promise.all([new Promise(promise.bind(this, values)), item])
    })

    Q.allSettled(promises).then(this.checkAsync.bind(this, errors))
  }

  checkAsync (sync, async) {
    const asyncValidation = async.reduce(
      (results, item) => {
        const [value, field] = item.value
        const result = item.state === 'fulfilled' && value
        if (!result) {
          results[field] = result
        }
        return results
      }, {})

    const hasErrors = !!Object.keys(asyncValidation).length || !!Object.keys(sync).length

    if (hasErrors) {
      const allErrors = {
        ...sync,
        ...asyncValidation,
      }

      this._invalid(allErrors)
      return
    }
    this._valid()
  }

  _pending () {
    this.updateStatus({ status: 'pending' })
  }

  _invalid (errors) {
    this.updateStatus({ status: 'invalid', errors })
  }

  _valid () {
    this.updateStatus({ status: 'valid' })
  }
}

const validator = (values, roles, updateStatus) => {
  let findError = false

  updateStatus({ status: 'pending' })
  const errors = {}
  for (let value in values) {
    for (let validate in roles.sync) {
      if (roles.sync[validate].fields.indexOf(value) !== -1) {
        if (!roles.sync[validate].fn(values[value]) && !errors[value]) {
          errors[value] = roles.sync[validate].text
          findError = true
        }
      }
    }
  }

  if (findError) {
    updateStatus({ status: 'invalid', errors })
    return
  }

  if (!findError && (!roles.async || !Object.keys(roles.async).length)) {
    updateStatus({ status: 'valid' })
    return
  }

  const promises = Object.keys(roles.async).map(item => {
    const { promise, values } = roles.async[item]
    return Promise.all([new Promise(promise.bind(this, values)), item])
  })

  Q.allSettled(promises).then(checkAsync.bind(this, errors, updateStatus))
}

function checkAsync (sync, status, async) {
  const asyncValidation = async.reduce(
    (results, item) => {
      const [value, field] = item.value
      const result = item.state === 'fulfilled' && value
      if (!result) {
        results[field] = result
      }
      return results
    }, {})

  const hasErrors = !!Object.keys(asyncValidation).length || !!Object.keys(sync).length

  if (hasErrors) {
    const allErrors = {
      ...sync,
      ...asyncValidation,
    }

    status({ status: 'invalid', errors: allErrors })
    return
  }
  status({ status: 'valid' })
}

export default ValidatorClass
