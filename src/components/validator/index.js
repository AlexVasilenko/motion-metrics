const validator = (values, roles) => {
  let findError = false

  const errors = {}
  for (let value in values) {
    for (let validate in roles) {
      if (roles[validate].fields.indexOf(value) !== -1) {
        if (!roles[validate].fn(values[value]) && !errors[value]) {
          errors[value] = roles[validate].text
          findError = true
        }
      }
    }
  }

  if (findError) {
    return errors
  }
  return false
}

export default validator
