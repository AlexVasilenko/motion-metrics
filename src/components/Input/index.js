import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export class Input extends React.Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
  }

  generateErrors(errors) {
    return errors.map((item, i) => (<div>{item}</div>))
  }


  render() {
    return (<span>
        <input placeholder="Task Title" name="title" formControlName="title" required />
        {this.generateErrors(this.props.errors)}
    </span>)
  }
}


export default Input
