import React, { Component } from 'react'
import axios from 'axios'

import { withRouter, Link } from 'react-router-dom'

class EditCharacter extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(fieldName, fieldValue) {
    let newState = this.state
    newState[fieldName] = fieldValue
    this.setState(newState)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = this.state
    axios.put('/api/character/' + data.name, data)
         .then(response => {
           this.props.history.push('/')
         })
  }

  componentDidMount() {
    axios.get(`/api/character/${this.props.match.params['name']}`)
         .then(response => {
           this.setState(response.data)
         })
  }

  render() {
    const fields = Object.keys(this.state)

    return <div>
      <h2>{this.state.name}</h2>

      <form onSubmit={this.handleSubmit}>
        {fields.map(field => {
          return <div key={field}>
            <label>
              {field.replace('_', ' ')}:
              <input type="text" value={this.state[field]} onChange={(e) => this.handleChange(field, e.target.value)} />
            </label>
          </div>
        })}

        <input type="submit" value="Save" />
        <Link to="/">Cancel edit</Link>
      </form>
    </div>
  }

}

export default withRouter(EditCharacter)
